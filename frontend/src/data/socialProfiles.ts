// Social profile data - Update this file to change profile information
// This keeps profile data separate from UI components

export interface SocialProfile {
  name: string;
  username: string;
  bio: string;
  avatar: string;
  location?: string;
  followers?: string;
  extraInfo?: string;
}

export type SocialPlatform = "linkedin" | "github" | "whatsapp" | "twitter" | "instagram";

// Profile data keyed by the username/identifier in the URL
export const socialProfiles: Record<string, Partial<Record<SocialPlatform, SocialProfile>>> = {
  // LinkedIn profiles (keyed by linkedin username)
  "ajinkya-mhetre01": {
    linkedin: {
      name: "Ajinkya Mhetre",
      username: "Full Stack Developer",
      bio: "Open to work • Web Developer, Fresher and Full-stack Developer roles",
      avatar: "https://media.licdn.com/dms/image/v2/D4D03AQHxHkVcyqg9wg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1699374415877?e=1742428800&v=beta&t=LdGYLBOXL9Efs8kQ6vlPVz8N9PKk5R5H_YLkGLOOmzU",
      location: "Pune, Maharashtra, India",
      followers: "1,438 followers • 500+ connections",
    },
  },
  
  // GitHub profiles (keyed by github username) - fetched dynamically via API
  "ajinkya-m-01": {
    github: undefined, // Will be fetched from GitHub API
  },
  
  // WhatsApp profiles (keyed by phone number)
  "919665248981": {
    whatsapp: {
      name: "Ajinkya Mhetre",
      username: "+91 9665248981",
      bio: "Send a message to start a conversation",
      avatar: "",
      location: "Pune, India",
    },
  },
};

// Function to get profile by URL identifier and platform
export const getStoredProfile = (
  identifier: string,
  platform: SocialPlatform
): SocialProfile | undefined => {
  const profileSet = socialProfiles[identifier];
  if (profileSet) {
    return profileSet[platform];
  }
  return undefined;
};
