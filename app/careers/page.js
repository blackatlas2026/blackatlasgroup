"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";


export default function Careers() {
    const [loading, setLoading] = useState(false);
    const [cvFile, setCvFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
        let cvUrl = "";

        // 1️⃣ Upload CV to Cloudinary
        if (cvFile) {
            const uploadData = new FormData();
            uploadData.append("file", cvFile);

            const uploadRes = await fetch("/api/careers/upload-cv", {
            method: "POST",
            body: uploadData,
            });

            const uploadJson = await uploadRes.json();

            if (!uploadRes.ok) {
            throw new Error(uploadJson.error || "CV upload failed");
            }

            cvUrl = uploadJson.downloadUrl;
        }

        // 2️⃣ Send Email via EmailJS
        await emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
            process.env.NEXT_PUBLIC_EMAILJS_CAREERS_TEMPLATE_ID,
            {
            full_name: e.target.full_name.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            position: e.target.position.value,
            linkedin: e.target.linkedin.value,
            cover_letter: e.target.cover_letter.value,
            cv_url: cvUrl || "No CV uploaded",
            },
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
        );

        alert("Application submitted successfully 🚀");
        e.target.reset();
        setCvFile(null);
        } catch (err) {
        console.error(err);
        alert("Something went wrong. Please try again.");
        } finally {
        setLoading(false);
        }
  };


  return (
    <section className="pt-32 pb-24 bg-slate-50 dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Join Our <span className="text-rose-600">Team</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Shape the future of premium retail. We're looking for passionate individuals who strive for excellence.
          </p>
        </header>

        

        {/* FORM */}
        <section className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-slate-800 p-8 md:p-12 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-2xl shadow-slate-200/20">

            <h2 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">
              Apply Now
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mb-10">
              Complete the form below to submit your candidacy.
            </p>

            

            <form  className="space-y-8"  onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <label
                            htmlFor="full_name"
                            className="text-sm font-semibold text-slate-700 dark:text-slate-300"
                        >
                            Full Name
                        </label>

                        <input
                            name="full_name"
                            type="text"
                            placeholder="John Doe"
                            required
                            className="w-full px-5 py-4 rounded-xl bg-slate-50 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-slate-900 transition-all text-slate-900 dark:text-white"
                        />
                        </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="email">Email Address</label>
                        <input className="w-full px-5 py-4 rounded-xl bg-slate-50 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-slate-900 transition-all text-slate-900 dark:text-white" name="email" placeholder="john@example.com" required="" type="email"/>
                    </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="phone">Phone Number</label>
                        <input className="w-full px-5 py-4 rounded-xl bg-slate-50 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-slate-900 transition-all text-slate-900 dark:text-white" name="phone" placeholder="+1 (555) 000-0000" required="" type="tel"/>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="position">Position Applied For</label>
                        <select className="w-full px-5 py-4 rounded-xl bg-slate-50 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-slate-900 transition-all text-slate-900 dark:text-white appearance-none" name="position" required="">
                        <option disabled=""  value="">Select a role</option>
                        <option value="frontend">Frontend Developer</option>
                        <option value="product-designer">Senior Product Designer</option>
                        <option value="marketing-manager">Marketing Manager</option>
                        <option value="customer-success">Customer Excellence Lead</option>
                        <option value="supply-chain">Supply Chain Analyst</option>
                        </select>
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="linkedin">LinkedIn Profile URL</label>
                    <input className="w-full px-5 py-4 rounded-xl bg-slate-50 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-slate-900 transition-all text-slate-900 dark:text-white" name="linkedin" placeholder="https://linkedin.com/in/username" required="" type="url"/>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="cover_letter">Cover Letter</label>
                    <textarea className="w-full px-5 py-4 rounded-xl bg-slate-50 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-slate-900 transition-all text-slate-900 dark:text-white min-h-[160px]" name="cover_letter" placeholder="Tell us why you're the perfect fit..." required=""></textarea>
                </div>
                <div className="space-y-2">
  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
    Upload CV / Resume
  </label>

  <div
    className={`
      border-2 border-dashed rounded-xl p-10 text-center transition-colors cursor-pointer
      ${
        cvFile
          ? "border-green-500/40 bg-green-500/5"
          : "border-red-600/30 bg-red-600/5 hover:bg-red-600/10"
      }
    `}
  >
    <input
      id="cv_upload"
      name="cv_upload"
      type="file"
      accept=".pdf,.doc,.docx"
      className="hidden"
      onChange={(e) => setCvFile(e.target.files?.[0] || null)}
    />

    <label
      htmlFor="cv_upload"
      className="cursor-pointer flex flex-col items-center gap-2"
    >
      {cvFile ? (
        <>
          <span className="material-symbols-outlined text-green-600 text-5xl">
            check_circle
          </span>

          <p className="font-semibold text-slate-900 dark:text-white">
            {cvFile.name}
          </p>

          <p className="text-sm text-slate-500">
            Click to replace file
          </p>
        </>
      ) : (
        <>
          <span className="material-symbols-outlined text-red-600 text-5xl">
            cloud_upload
          </span>

          <p className="font-bold text-slate-900 dark:text-white text-lg">
            Drag & Drop or Browse
          </p>

          <p className="text-sm text-slate-500">
            PDF, DOCX (Max 10MB)
          </p>
        </>
      )}
    </label>
  </div>
</div>

                <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-5 rounded-xl transition-all flex items-center justify-center gap-2 text-xl shadow-lg shadow-red-500/20 active:scale-[0.98]" disabled={loading} type="submit">
                                       {loading ? (
                                                        "Submitting..."
                                                    ) : (
                                                        <>
                                                        Submit Application
                                                        <span className="material-symbols-outlined ml-2">description</span>
                                                        </>
                                                    )}
                                      
                                        
                </button>
                <p className="text-center text-xs text-slate-400 leading-relaxed max-w-md mx-auto">
                                        By submitting, you agree to our <a className="underline hover:text-red-600 transition-colors" href="#">Privacy Policy</a> and authorize us to process your data for recruitment purposes.
                                    </p>
            </form>
          </div>
        </section>

      </div>
    </section>
  );
}



{/* CARDS */}
        {/* <section className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: 'trending_up', title: 'Growth Opportunities', text: 'Mentorship, certifications, and clear career paths.' },
            { icon: 'diversity_3', title: 'Inclusive Culture', text: 'A diverse team where every voice matters.' },
            { icon: 'lightbulb', title: 'Innovation First', text: 'Creative freedom with cutting-edge technology.' },
          ].map(card => (
            <div
              key={card.title}
              className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 hover:-translate-y-1 transition-transform"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-600/10 flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-rose-600 text-2xl">
                  {card.icon}
                </span>
              </div>

              <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">
                {card.title}
              </h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                {card.text}
              </p>
            </div>
          ))}
        </section> */}