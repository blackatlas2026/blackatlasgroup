"use client";
import { useState,useEffect, useRef } from "react";

export default function BrandStory({
  isOpen,
  onClose,
  mode = "edit",
  initialData = null, // Fixed: stories not items
  onSubmit,
}) {
  const [sectionTitle, setSectionTitle] = useState("");
  const [storyItems, setStoryItems] = useState([]
  );

  
  const [tempUploads, setTempUploads] = useState([]); // Track new upload
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState({}); // Track upload status per item
  const fileInputRef = useRef(null);



// ✅ FIXED useEffect
useEffect(() => {
  console.log("🔄 useEffect triggered:", { mode, initialData });
  
  if (initialData) {
    console.log("📝 Setting data:", initialData);
    
    setSectionTitle(initialData.title || "");
    setStoryItems(
      (initialData.stories || []).map((item) => ({
        ...item,
        id: Date.now() + Math.random()
      }))
    );
  } else {
    // Reset for create mode
    setSectionTitle("");
    setStoryItems([]);
  }
}, [mode, initialData]); // ✅ Dependencies

// ✅ Debug AFTER state updates (separate effect)
useEffect(() => {
  console.log("✅ sectionTitle updated:", sectionTitle);
}, [sectionTitle]);

useEffect(() => {
  console.log("✅ storyItems updated:", storyItems.length);
}, [storyItems]);

  const getSignature = async () => {
    const res = await fetch("/api/admin/sign-cloudinary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ folder: "brandStory" }),
    });
    if (!res.ok) throw new Error("Failed to get Cloudinary signature");
    return res.json();
  };

  const uploadToCloudinary = async (file) => {
    try {
      const { timestamp, signature, apiKey, cloudName } = await getSignature();

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", apiKey);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);
      formData.append("folder", "brandStory");

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: formData }
      );

      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      const url =  data.secure_url;
      setTempUploads(prev => [...prev, url]);
      return url;
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  };

  

  // ✅ FIXED REGEX - Cloudinary URLs use / not \
  const extractPublicId = (url) => {
    // Matches: https://res.cloudinary.com/demo/image/upload/v123456789/brandStory/abc123.jpg
    const match = url.match(/\/([^\/]+)\/([^\/]+)\./);
    if (!match) return null;
    
    const folder = match[1];     // "brandStory"
    const filename = match[2];   // "abc123.jpg"
    const publicId = filename.split('.')[0]; // "abc123"
    
    return { folder, publicId, fullPath: `${folder}/${publicId}` };
  };

  const cleanupTempUploads = async (urls) => {
    try {
      await Promise.all(
        urls.map(async (url) => {
          const publicIdInfo = extractPublicId(url);
          console.log(publicIdInfo);
          if (publicIdInfo) {
            await fetch('/api/admin/delete-cloudinary', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                public_id: publicIdInfo.fullPath,
                folder: publicIdInfo.folder
              })
            });
          }
        })
      );
    } catch (err) {
      console.warn('Cleanup failed (non-blocking):', err);
    }
  };



  const handleImageUpload = async (itemId) => {
    const file = fileInputRef.current?.files[0];
    if (!file) return;

    try {
      const imageUrl = await uploadToCloudinary(file);
      updateItem(itemId, "image", imageUrl);
    } finally {
      fileInputRef.current.value = "";
    }
  };

  // ✅ Cleanup on close WITHOUT saving
  const handleClose = async () => {
    if (tempUploads.length > 0) {
      await cleanupTempUploads(tempUploads);
    }
    setTempUploads([]);  // Reset tracking
    setStoryItems([]);   // Reset form
    onClose();
  };

  // ✅ Clear tracking on successful save
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark uploads as "committed" - don't cleanup
    const finalData = { title: sectionTitle, stories: storyItems };
    setTempUploads([]);  // Clear tracking
    
    try {
      await onSubmit(finalData);
        setSectionTitle("");
        setStoryItems([]);  
      onClose();  // Safe close - no cleanup needed
    } catch (err) {
      // Restore tracking if submit fails
      console.error(err);
      alert("Save failed");
    }
  };

//   const handleClose = async () => {
//     // Cleanup temp uploads when closing WITHOUT saving
//     if (tempUploads.length > 0) {
//       try {
//         await Promise.all(
//           tempUploads.map(url => 
//             fetch('/api/admin/delete-cloudinary', {
//               method: 'POST',
//               headers: { 'Content-Type': 'application/json' },
//               body: JSON.stringify({ public_id: extractPublicId(url) })
//             })
//           )
//         );
//       } catch (err) {
//         console.warn('Cleanup failed:', err); // Don't block UX
//       }
//     }
//     setTempUploads([]); // Reset
//     onClose();
//   };

//   const handleImageUpload = async (itemId) => {
//     const file = fileInputRef.current?.files[0];
//     if (!file) {
//       alert("Please select an image");
//       return;
//     }

//     setUploading(prev => ({ ...prev, [itemId]: true }));

//     try {
//       const imageUrl = await uploadToCloudinary(file);
//       updateItem(itemId, "image", imageUrl);
//       // Reset file input
//       if (fileInputRef.current) {
//         fileInputRef.current.value = "";
//       }
//     } catch (error) {
//       alert("Upload failed: " + error.message);
//     } finally {
//       setUploading(prev => ({ ...prev, [itemId]: false }));
//     }
//   };

  const addItem = () => {
    setStoryItems([
      ...storyItems,
      { title: "", description: "", image: "", id: Date.now() + Math.random() },
    ]);
  };

  // Replace your existing deleteItem function
const deleteItem = async (id) => {
  // Find the item being deleted
  const itemToDelete = storyItems.find(item => item.id === id);
  
  // If it has a NEW upload (in tempUploads), delete from Cloudinary
  if (itemToDelete?.image) {
    try {
      const publicIdInfo = extractPublicId(itemToDelete.image);
      if (publicIdInfo) {
        await fetch('/api/admin/delete-cloudinary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            public_id: publicIdInfo.fullPath,
            folder: publicIdInfo.folder
          })
        });
        
        // Remove from temp tracking
        setTempUploads(prev => prev.filter(url => url !== itemToDelete.image));
      }
    } catch (err) {
      console.warn('Failed to delete image from Cloudinary:', err);
      // Don't block UI - continue with local delete
    }
  }
  
  // Remove from local state
  setStoryItems(storyItems.filter((item) => item.id !== id));
};


  const moveItem = (index, direction) => {
    const newItems = [...storyItems];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= storyItems.length) return;
    [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];
    setStoryItems(newItems);
  };

  const updateItem = (id, key, value) => {
    setStoryItems(storyItems.map((item) => 
      item.id === id ? { ...item, [key]: value } : item
    ));
  };

  if (!isOpen) return null;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       // Fixed: stories instead of items
//       setTempUploads([]);
//       await onSubmit?.({
//         title: sectionTitle,
//         stories: storyItems,
//       });
//       onClose();
//     } catch (err) {
//       console.error(err);
//       alert("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

  

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-2xl border border-gray-100 overflow-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
          <h3 className="text-2xl font-bold">
            {mode === "edit" ? "Edit Brand Story" : "Add Brand Story"}
          </h3>
          <button onClick={() => {setStoryItems([]); onClose()}} className="text-2xl hover:text-gray-600">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
          {/* Section Title */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700">Section Title</label>
            <input
              value={sectionTitle}
              onChange={(e) => setSectionTitle(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Our Journey & Milestones"
              required
            />
          </div>

          {/* Story Items */}
          <div className="space-y-6">
            {storyItems.map((item, idx) => (
              <div key={item.id} className="group relative bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Image Upload Area */}
                  <div className="w-full lg:w-56 shrink-0">
                    <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden relative border-2 border-dashed border-gray-200 mb-4 transition-all group-hover:border-blue-300">
                      {item.image ? (
                        <div className="relative w-full h-full">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover" 
                          />
                          <button
                            type="button"
                            onClick={() => updateItem(item.id, "image", "")}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 shadow-lg hover:bg-red-600 transition-all opacity-0 group-hover:opacity-100"
                          >
                            <span className="material-symbols-outlined text-sm">close</span>
                          </button>
                        </div>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 space-y-2 p-4">
                          <span className="material-symbols-outlined text-4xl text-gray-300">image</span>
                          <p className="text-xs text-center">No Image</p>
                        </div>
                      )}
                    </div>

                    {/* Upload Controls */}
                    <div className="space-y-2">
                      {/* File Input (hidden) */}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={() => handleImageUpload(item.id)}
                        className="hidden"
                      />
                      
                      {/* Upload Button */}
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading[item.id]}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all"
                      >
                        {uploading[item.id] ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <span className="material-symbols-outlined text-base">cloud_upload</span>
                            Upload Image
                          </>
                        )}
                      </button>

                      {/* URL Button */}
                      <button
                        type="button"
                        onClick={() => {
                          const url = prompt("Enter image URL:");
                          if (url) updateItem(item.id, "image", url);
                        }}
                        className="w-full px-4 py-2 text-xs text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg font-medium transition-colors"
                      >
                        Or paste URL
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <span className="bg-blue-100 px-3 py-1 rounded-full text-xs font-bold text-blue-700">
                        ITEM #{idx + 1}
                      </span>
                      <div className="flex items-center gap-1">
                        <button 
                          type="button" 
                          onClick={() => moveItem(idx, -1)} 
                          className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
                          disabled={idx === 0}
                        >
                          <span className="material-symbols-outlined text-lg">arrow_upward</span>
                        </button>
                        <button 
                          type="button" 
                          onClick={() => moveItem(idx, 1)} 
                          className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
                          disabled={idx === storyItems.length - 1}
                        >
                          <span className="material-symbols-outlined text-lg">arrow_downward</span>
                        </button>
                        <button 
                          type="button" 
                          onClick={() => deleteItem(item.id)} 
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 ml-1 rounded-lg transition-all"
                        >
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>
                    </div>
                    
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => updateItem(item.id, "title", e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg font-semibold text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Story Title"
                      required
                    />
                    <textarea
                      rows={4}
                      value={item.description}
                      onChange={(e) => updateItem(item.id, "description", e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm leading-relaxed focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
                      placeholder="Tell the story behind this milestone..."
                      required
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Add New Item */}
            <button
              type="button"
              onClick={addItem}
              className="w-full py-12 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-3 text-gray-400 hover:text-blue-500 hover:border-blue-300 hover:bg-blue-50/50 transition-all group"
            >
              <div className="bg-gray-100 rounded-2xl p-4 group-hover:bg-blue-100 transition-colors">
                <span className="material-symbols-outlined text-3xl group-hover:text-blue-500 transition-colors">add</span>
              </div>
              <span className="font-bold text-lg">Add New Story Item</span>
            </button>
          </div>

          {/* Actions */}
          <div className="pt-6 flex flex-col sm:flex-row gap-4 border-t border-gray-100">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all text-lg"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                "Save Story"
              )}
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="px-8 py-4 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
