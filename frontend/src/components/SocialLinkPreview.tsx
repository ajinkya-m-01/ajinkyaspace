import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Loader2, User, MapPin, Link as LinkIcon, Users } from "lucide-react";
import { getStoredProfile, SocialPlatform, SocialProfile } from "../data/socialProfiles";

interface ProfileData {
  name: string;
  username: string;
  bio: string;
  avatar: string;
  location?: string;
  followers?: string;
  platform: string;
}

interface SocialLinkPreviewProps {
  href: string;
  label: string;
  children: React.ReactNode;
  className?: string;
  position?: "top" | "right";
}

// Extract platform and username from URL
const parseProfileUrl = (url: string): { platform: string; username: string } | null => {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();
    const pathname = urlObj.pathname;

    if (hostname.includes("linkedin.com")) {
      const match = pathname.match(/\/in\/([^\/\?]+)/);
      return match ? { platform: "linkedin", username: match[1] } : null;
    }

    if (hostname.includes("github.com")) {
      const match = pathname.match(/^\/([^\/\?]+)/);
      return match && match[1] ? { platform: "github", username: match[1] } : null;
    }

    if (hostname.includes("wa.me") || hostname.includes("whatsapp.com")) {
      const match = pathname.match(/\/(\d+)/);
      return match ? { platform: "whatsapp", username: match[1] } : null;
    }

    if (hostname.includes("twitter.com") || hostname.includes("x.com")) {
      const match = pathname.match(/^\/([^\/\?]+)/);
      return match && match[1] ? { platform: "twitter", username: match[1] } : null;
    }

    if (hostname.includes("instagram.com")) {
      const match = pathname.match(/^\/([^\/\?]+)/);
      return match && match[1] ? { platform: "instagram", username: match[1] } : null;
    }

    return null;
  } catch {
    return null;
  }
};

// Platform-specific colors and styling
const platformStyles: Record<string, { gradient: string; accent: string; icon: string }> = {
  linkedin: {
    gradient: "from-[#0077B5] to-[#00A0DC]",
    accent: "#0077B5",
    icon: "💼",
  },
  github: {
    gradient: "from-[#24292e] to-[#586069]",
    accent: "#24292e",
    icon: "🐙",
  },
  whatsapp: {
    gradient: "from-[#25D366] to-[#128C7E]",
    accent: "#25D366",
    icon: "💬",
  },
  twitter: {
    gradient: "from-[#1DA1F2] to-[#0d8bd9]",
    accent: "#1DA1F2",
    icon: "🐦",
  },
  instagram: {
    gradient: "from-[#833AB4] via-[#FD1D1D] to-[#F77737]",
    accent: "#E1306C",
    icon: "📸",
  },
};

const SocialLinkPreview = ({ href, label, children, className = "", position = "top" }: SocialLinkPreviewProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Detect touch device
  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  // Fetch profile data
  const fetchProfileData = useCallback(async () => {
    const parsed = parseProfileUrl(href);
    if (!parsed) {
      setError(true);
      return;
    }

    setLoading(true);
    setError(false);
    setAvatarError(false);

    try {
      const { platform, username } = parsed;

      // First, check for stored profile data
      const storedProfile = getStoredProfile(username, platform as SocialPlatform);
      if (storedProfile) {
        setProfileData({
          ...storedProfile,
          platform,
        });
        setLoading(false);
        return;
      }

      // GitHub has a public API we can use
      if (platform === "github") {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (response.ok) {
          const data = await response.json();
          setProfileData({
            name: data.name || data.login,
            username: `@${data.login}`,
            bio: data.bio || "Check out my repositories and contributions",
            avatar: data.avatar_url,
            location: data.location,
            followers: `${data.followers} followers`,
            platform,
          });
          setLoading(false);
          return;
        }
      }

      // For other platforms, create a preview based on URL info
      // These platforms don't have public APIs, so we show platform-appropriate preview
      const platformPreviews: Record<string, Omit<ProfileData, "platform">> = {
        linkedin: {
          name: username.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
          username: `linkedin.com/in/${username}`,
          bio: "View professional profile and connect",
          avatar: "",
        },
        whatsapp: {
          name: "WhatsApp",
          username: `+${username}`,
          bio: "Start a conversation directly",
          avatar: "",
        },
        twitter: {
          name: username,
          username: `@${username}`,
          bio: "View tweets and follow on X",
          avatar: "",
        },
        instagram: {
          name: username,
          username: `@${username}`,
          bio: "View photos and follow",
          avatar: "",
        },
      };

      const preview = platformPreviews[platform];
      if (preview) {
        setProfileData({ ...preview, platform });
      } else {
        setError(true);
      }
    } catch (err) {
      console.error("Failed to fetch profile:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [href]);

  const handleMouseEnter = () => {
    if (isTouchDevice) return;
    
    // Clear any pending leave timeout
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }

    // Delay showing the preview to avoid flickering
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovering(true);
      if (!profileData && !loading) {
        fetchProfileData();
      }
    }, 200);
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;

    // Clear pending hover timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    // Delay hiding to allow moving to the card
    leaveTimeoutRef.current = setTimeout(() => {
      setIsHovering(false);
    }, 150);
  };

  const handleCardMouseEnter = () => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
  };

  const handleCardMouseLeave = () => {
    setIsHovering(false);
  };

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
    };
  }, []);

  const parsed = parseProfileUrl(href);
  const platform = parsed?.platform || "default";
  const styles = platformStyles[platform] || platformStyles.github;

  return (
    <span className="relative inline-block">
      <a
        ref={linkRef}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </a>

      <AnimatePresence>
        {isHovering && !isTouchDevice && (
          <motion.div
            initial={{ opacity: 0, y: position === "top" ? 10 : 0, x: position === "right" ? -10 : 0, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            exit={{ opacity: 0, y: position === "top" ? 10 : 0, x: position === "right" ? -10 : 0, scale: 0.95 }}
            transition={{ 
              duration: 0.2, 
              ease: [0.23, 1, 0.32, 1] 
            }}
            className={`absolute z-50 ${
              position === "right" 
                ? "left-full top-1/2 -translate-y-1/2 ml-3" 
                : "bottom-full left-1/2 -translate-x-1/2 mb-3"
            }`}
            onMouseEnter={handleCardMouseEnter}
            onMouseLeave={handleCardMouseLeave}
           style={{ willChange: "transform, opacity" }}>
            {/* Arrow pointer */}
            <div className={`absolute w-4 h-4 rotate-45 bg-background border-border/30 ${
              position === "right"
                ? "-left-2 top-1/2 -translate-y-1/2 border-l border-b"
                : "-bottom-2 left-1/2 -translate-x-1/2 border-r border-b"
            }`} />
            
            <div className="relative w-72 bg-background rounded-xl shadow-2xl border border-border/30 overflow-hidden backdrop-blur-xl">
              {/* Gradient header */}
              <div className={`h-16 bg-gradient-to-r ${styles.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute top-2 right-2 text-2xl opacity-80">{styles.icon}</div>
              </div>

              {/* Profile content */}
              <div className="px-4 pb-4 -mt-6 relative">
                {loading ? (
                  <div className="flex flex-col items-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                    <p className="text-xs text-muted-foreground mt-2">Loading profile...</p>
                  </div>
                ) : error ? (
                  <div className="flex flex-col items-center py-6">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-2">
                      <LinkIcon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-medium">{label}</p>
                    <p className="text-xs text-muted-foreground mt-1">Click to visit profile</p>
                  </div>
                ) : profileData ? (
                  <>
                    {/* Avatar */}
                    <div className="flex justify-start">
                      {profileData.avatar && !avatarError ? (
                        <img
                          src={profileData.avatar}
                          alt={profileData.name}
                          className="w-14 h-14 rounded-full border-4 border-background shadow-lg object-cover bg-muted"
                          onError={() => setAvatarError(true)}
                        />
                      ) : (
                        <div 
                          className={`w-14 h-14 rounded-full border-4 border-background shadow-lg flex items-center justify-center bg-gradient-to-br ${styles.gradient}`}
                        >
                          <span className="text-white font-semibold text-lg">
                            {getInitials(profileData.name)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="mt-2">
                      <h4 className="text-sm font-semibold text-foreground leading-tight">
                        {profileData.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">{profileData.username}</p>
                      
                      <p className="text-xs text-foreground/70 mt-2 line-clamp-2 leading-relaxed">
                        {profileData.bio}
                      </p>

                      {/* Meta info */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-[11px] text-muted-foreground">
                        {profileData.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">{profileData.location}</span>
                          </span>
                        )}
                        {profileData.followers && (
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3 flex-shrink-0" />
                            <span>{profileData.followers}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* View profile button */}
                    <div className="mt-3 pt-3 border-t border-border/20">
                      <a 
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-gradient-to-r ${styles.gradient} text-white text-xs font-medium hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200`}
                      >
                        <span>View {label} Profile</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};

export default SocialLinkPreview;
