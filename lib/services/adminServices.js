import { adminAuth } from "@/lib/firebase-admin";


export async function getAllAdmins() {
  const listUsersResult = await adminAuth.listUsers(1000);

  const admins = listUsersResult.users
    .filter(user => user.customClaims?.admin)
    .map(user => ({
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      superadmin: user.customClaims?.superadmin || false,
      createdAt: user.metadata.creationTime,
      disabled: user.disabled,
    }));

    console.log(admins);

  return admins;
}



export async function createAdmin({
  email,
  password,
  displayName = "",
  superadmin = false,
}) {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  try {
    //  Create Auth user
    const userRecord = await adminAuth.createUser({
      email,
      password,
      displayName,
    });

    //  Set custom claims
    await adminAuth.setCustomUserClaims(userRecord.uid, {
      admin: true,
      superadmin,
    });

    // Return consistent structure
    return {
      success: true,
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName,
      admin: true,
      superadmin,
    };
  } catch (error) {
    console.error("createAdmin error:", error);

    // Optional: normalize Firebase errors
    if (error.code === "auth/email-already-exists") {
      throw new Error("Email already exists");
    }

    throw new Error(error.message || "Failed to create admin");
  }
}

export async function removeAdminRole(uid) {
  if (!uid) {
    throw new Error("UID is required");
  }

  await adminAuth.setCustomUserClaims(uid, {
    admin: false,
    superadmin: false,
  });

  return true;
}


export async function deleteAdminUser(uid) {
  if (!uid) {
    throw new Error("UID is required");
  }

  await adminAuth.deleteUser(uid);
  return true;
}