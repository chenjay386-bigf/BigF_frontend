import React, { useState, useEffect, useRef, useMemo } from "react";
import { checkBackend } from "./api";

const INITIAL_PRODUCTS = [
  {
    id: "p1",
    name: "BIGF Chicken Flavor",
    price: "KSh 50 / pack",
    rating: "4.9",
    reviews: "128",
    image: "/images/chicken-flavour.png",
    badge: "Chicken Flavor",
    description: "Rich, comforting chicken broth infused with authentic Asian herbs and spices. Satisfying and wholesome for every family."
  },
  {
    id: "p2",
    name: "BIGF Beef Flavor",
    price: "KSh 50 / pack",
    rating: "4.8",
    reviews: "142",
    image: "/images/beef-flavour.png",
    badge: "Beef Flavor",
    description: "Deep, savory braised beef flavor designed for instant warmth and delicious satisfaction anytime of day."
  },
  {
    id: "p3",
    name: "BIGF Sweet Chili Sauce Noodles",
    price: "KSh 60 / pack",
    rating: "5.0",
    reviews: "210",
    image: "/images/tossed-noodles.png",
    badge: "Sweet Chili",
    description: "Bold chili oil paired with sweet tangy sauce for spice lovers looking for an exciting kick."
  }
];

const INITIAL_FEATURED_ENTRIES = [];
const INITIAL_CHALLENGE_SUBMISSIONS = [];

const INITIAL_CHALLENGES = [
  {
    id: "c1",
    title: "BIGF Season 1 Noodle Rumble Challenge",
    organizer: "@BIGFKenya",
    daysLeft: 14,
    prize: "KSh 15,000 Cash + BIGF Mega Supply",
    tag: "#NoodleRumble",
    category: "Main",
    description: "Cook your favorite BIGF noodles with your own twist, post your entry on TikTok, then submit the TikTok video link here for review.",
    rules: [
      "1. Create your BIGF challenge video and publish it on TikTok.",
      "2. Copy your TikTok video link and submit it here for review.",
      "3. TikTok Likes determine the winner!"
    ]
  },
  {
    id: "c2",
    title: "5-Minute Speedy Chef Challenge",
    organizer: "@BIGFKenya",
    daysLeft: 7,
    prize: "KSh 10,000 Cash + Noodle Pack",
    tag: "#SpeedyChef",
    category: "Speed",
    description: "Show us how fast and creative you can upgrade your BIGF instant noodles under 5 minutes, post your video on TikTok, then submit the link here.",
    rules: [
      "1. Publish your BIGF challenge video on TikTok.",
      "2. Submit the TikTok video link for review.",
      "3. TikTok Likes determine the winner!"
    ]
  },
  {
    id: "c3",
    title: "Midnight Cravings Special Mix",
    organizer: "@BIGFKenya",
    daysLeft: 20,
    prize: "KSh 8,000 Cash Voucher",
    tag: "#MidnightCravings",
    category: "Creative",
    description: "What do you add to your midnight BIGF noodles? Show it on TikTok, then submit your video link to enter.",
    rules: [
      "1. Publish your late-night BIGF creation on TikTok.",
      "2. Submit the TikTok video link here.",
      "3. TikTok Likes determine the winner!"
    ]
  }
];

const BACKGROUND_NOODLES = [
  "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=1000&q=80"
];

const CATEGORIES = ["All", "Main", "Speed", "Creative", "Themed", "Gamified", "Interactive"];

export default function App() {
  const [activeNavTab, setActiveNavTab] = useState("home");
  const [featuredEntries, setFeaturedEntries] = useState(INITIAL_FEATURED_ENTRIES);
  const [challengeSubmissions, setChallengeSubmissions] = useState(INITIAL_CHALLENGE_SUBMISSIONS);
  const [challenges, setChallenges] = useState(INITIAL_CHALLENGES);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [selectedHubChallenge, setSelectedHubChallenge] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const [quizStep, setQuizStep] = useState(1);
  const [quizSpice, setQuizSpice] = useState(null);
  const [quizResult, setQuizResult] = useState(null);

  // Auth state
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("currentUser");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return null;
  });

  // Auth form states
  const [authMode, setAuthMode] = useState("login");
  const [loginUsername, setLoginUsername] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupDisplayName, setSignupDisplayName] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Email verification states
  const [email, setEmail] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [displayName, setDisplayName] = useState("");

  // Notifications state
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("notifications");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [];
  });
  const [unreadCount, setUnreadCount] = useState(() => {
    const saved = localStorage.getItem("notifications");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.filter(n => !n.read).length;
      } catch (e) {}
    }
    return 0;
  });
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
    setUnreadCount(notifications.filter(n => !n.read).length);
  }, [notifications]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      localStorage.setItem("bigf_user_profile", JSON.stringify(currentUser));
      localStorage.setItem("accountRegistered", "true");
    }
  }, [currentUser]);

  const [isNewUser, setIsNewUser] = useState(() => {
    const hasVisited = localStorage.getItem("hasVisitedBefore");
    if (!hasVisited) {
      localStorage.setItem("hasVisitedBefore", "true");
      return true;
    }
    return false;
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);
  const [adminPasscode, setAdminPasscode] = useState("");
  const [newChalTitle, setNewChalTitle] = useState("");
  const [newChalPrize, setNewChalPrize] = useState("");
  const [newChalDays, setNewChalDays] = useState("14");
  const [newChalCategory, setNewChalCategory] = useState("Main");
  const [newChalDesc, setNewChalDesc] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [showChallengeActionModal, setShowChallengeActionModal] = useState(false);
  const [targetChallengeForUpload, setTargetChallengeForUpload] = useState(challenges[0]);
  const [challengeActionType, setChallengeActionType] = useState(null);
  
  const [showFreestyleModal, setShowFreestyleModal] = useState(false);
  const [newPostCaption, setNewPostCaption] = useState("");
  const [newPostMedia, setNewPostMedia] = useState(null);
  
  const [mediaSubMode, setMediaSubMode] = useState("choose");
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadPreview, setUploadPreview] = useState(null);
  const [uploadCaption, setUploadCaption] = useState("");
  const [externalSocialUrl, setExternalSocialUrl] = useState("");
  const [socialCaption, setSocialCaption] = useState("");
  const [productProofImage, setProductProofImage] = useState(null);
  const [productProofPreview, setProductProofPreview] = useState(null);
  
  const videoFeedRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  
  const [orders, setOrders] = useState([]);
  const [newCommentText, setNewCommentText] = useState("");

  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem("bigf_user_profile");
    if (saved) {
      try { 
        return JSON.parse(saved);
      } catch (e) {}
    }
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {}
    }
    return {
      name: "",
      handle: "",
      bio: "",
      avatar: "https://i.pravatar.cc/150?img=1",
      followers: 0,
      following: 0,
      posts: [],
      reposts: [],
      votedPosts: []
    };
  });

  const [profileTab, setProfileTab] = useState("overview");
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [editName, setEditName] = useState(currentUser?.name || userProfile.name);
  const [editBio, setEditBio] = useState(currentUser?.bio || userProfile.bio);
  const [editAvatar, setEditAvatar] = useState(currentUser?.avatar || userProfile.avatar);
  const [editHandle, setEditHandle] = useState(currentUser?.handle || userProfile.handle);

  const [appSettings, setAppSettings] = useState({
    darkMode: false,
    pushNotifications: true,
    privateAccount: false,
    autoplayVideos: true,
    dataSaver: false,
    restrictedMode: false
  });

  const [slots, setSlots] = useState([
    { id: 1, img: BACKGROUND_NOODLES[0], visible: true, pos: { top: "4%", left: "2%" } },
    { id: 2, img: BACKGROUND_NOODLES[1], visible: true, pos: { top: "8%", right: "3%" } },
    { id: 3, img: BACKGROUND_NOODLES[2], visible: true, pos: { top: "42%", left: "1%" } },
    { id: 4, img: BACKGROUND_NOODLES[3], visible: true, pos: { top: "38%", right: "2%" } }
  ]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.code === "KeyA") {
        e.preventDefault();
        setShowAdminLoginModal(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    checkBackend().catch(() => {});
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlots(prevSlots => {
        const targetIndex = Math.floor(Math.random() * prevSlots.length);
        return prevSlots.map((slot, idx) => {
          if (idx === targetIndex) {
            const nextVisibility = !slot.visible;
            let nextImg = slot.img;
            if (nextVisibility) {
              const randImg = BACKGROUND_NOODLES[Math.floor(Math.random() * BACKGROUND_NOODLES.length)];
              nextImg = randImg;
            }
            return { ...slot, visible: nextVisibility, img: nextImg };
          }
          return slot;
        });
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!showChallengeActionModal && cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
      setIsRecording(false);
    }
  }, [showChallengeActionModal, cameraStream]);

  useEffect(() => {
    if (currentUser) {
      setEditName(currentUser.name || "");
      setEditBio(currentUser.bio || "");
      setEditAvatar(currentUser.avatar || "");
      setEditHandle(currentUser.handle || "");
    }
  }, [currentUser]);

  const addNotification = (message, type = "info") => {
    const newNotification = {
      id: Date.now(),
      message,
      type,
      read: false,
      timestamp: new Date().toISOString()
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("bigf_user_profile");
      setCurrentUser(null);
      setUserProfile({ name: "", handle: "", bio: "", avatar: "https://i.pravatar.cc/150?img=1" });
      setActiveNavTab("home");
      setLoginUsername("");
      setSignupUsername("");
      setSignupDisplayName("");
      setEmail("");
      setIsEmailVerified(false);
      setVerificationCode("");
      setShowVerification(false);
      setDisplayName("");
      alert("You have been logged out successfully.");
    }
  };

  const handleLogin = () => {
    if (!loginUsername || loginUsername.length < 3) {
      alert("Please enter your username.");
      return;
    }

    const allUsersData = JSON.parse(localStorage.getItem("allUsersData") || "{}");
    const foundUser = allUsersData[loginUsername];
    
    if (!foundUser) {
      alert("Username not found. Please check your username or create a new account.");
      return;
    }

    setCurrentUser(foundUser);
    setUserProfile(foundUser);
    localStorage.setItem("currentUser", JSON.stringify(foundUser));
    localStorage.setItem("bigf_user_profile", JSON.stringify(foundUser));
    localStorage.setItem("accountRegistered", "true");
    setLoginUsername("");
    setShowAuthModal(false);
    alert("✅ Welcome back " + foundUser.name + "!");
    addNotification("Welcome back " + foundUser.name + "! 👋", "info");
  };

  const handleSignup = () => {
    if (!signupUsername || signupUsername.length < 3) {
      alert("Username must be at least 3 characters long.");
      return;
    }
    if (!signupDisplayName || signupDisplayName.length < 2) {
      alert("Please enter your display name.");
      return;
    }

    const allUsersData = JSON.parse(localStorage.getItem("allUsersData") || "{}");
    if (allUsersData[signupUsername]) {
      alert("Username already taken. Please choose a different username.");
      return;
    }

    const handle = "@" + signupUsername.toLowerCase().replace(/\s/g, "");
    const newUser = {
      id: "user-" + Date.now(),
      name: signupDisplayName,
      username: signupUsername,
      handle: handle,
      bio: "BIGF Challenge Participant",
      avatar: "https://i.pravatar.cc/150?img=" + Math.floor(1 + Math.random() * 70),
      followers: 0,
      following: 0,
      posts: [],
      reposts: [],
      votedPosts: [],
      submissions: [],
      createdAt: new Date().toISOString(),
      orders: []
    };

    allUsersData[signupUsername] = newUser;
    localStorage.setItem("allUsersData", JSON.stringify(allUsersData));

    const existingUsers = JSON.parse(localStorage.getItem("allUsers") || "[]");
    existingUsers.push({ username: signupUsername, userId: newUser.id });
    localStorage.setItem("allUsers", JSON.stringify(existingUsers));

    setCurrentUser(newUser);
    setUserProfile(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    localStorage.setItem("bigf_user_profile", JSON.stringify(newUser));
    localStorage.setItem("accountRegistered", "true");
    setSignupUsername("");
    setSignupDisplayName("");
    setShowAuthModal(false);
    alert("✅ Account created successfully! Welcome " + signupDisplayName + "!");
    
    addNotification("Welcome to BIGF Kenya! 🎉 Start by joining a challenge!", "info");
  };

  const handleSendVerificationCode = () => {
    if (!email || !email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setVerificationCode(code);
    setShowVerification(true);
    alert("Verification code sent to " + email + ": " + code);
  };

  const handleVerifyEmail = () => {
    if (!verificationCode || verificationCode.length !== 6) {
      alert("Please enter the 6-digit verification code.");
      return;
    }
    setIsEmailVerified(true);
    setShowVerification(false);
    alert("✅ Email verified! You can now submit your Challenge entry.");
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPasscode === "admin123" || adminPasscode === "BIGF2026") {
      setIsAdmin(true);
      setShowAdminLoginModal(false);
      setAdminPasscode("");
      setActiveNavTab("admin");
    } else {
      alert("Incorrect admin passcode! Try 'admin123' or 'BIGF2026'");
    }
  };

  const handleLogoutAdmin = () => {
    setIsAdmin(false);
    setActiveNavTab("home");
  };

  const handleCreateChallenge = (e) => {
    e.preventDefault();
    if (!newChalTitle.trim() || !newChalPrize.trim() || !newChalDesc.trim()) {
      alert("Please fill in all challenge details.");
      return;
    }

    const newChallengeObj = {
      id: "c-" + Date.now(),
      title: newChalTitle.trim(),
      organizer: "@BIGFKenya",
      daysLeft: parseInt(newChalDays) || 14,
      prize: newChalPrize.trim(),
      category: newChalCategory,
      tag: "#Challenge2026",
      description: newChalDesc.trim(),
      rules: [
        "1. Publish your BIGF challenge video on TikTok.",
        "2. Submit the TikTok video link for review.",
        "3. TikTok Likes determine the winner!"
      ]
    };

    setChallenges(prev => [newChallengeObj, ...prev]);
    setNewChalTitle("");
    setNewChalPrize("");
    setNewChalDays("14");
    setNewChalCategory("Main");
    setNewChalDesc("");
    alert("New challenge successfully published to the Challenge Hub!");
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!feedbackMessage.trim()) {
      alert("Please write your feedback before submitting.");
      return;
    }
    setFeedbackMessage("");
    setFeedbackSubmitted(true);
    setTimeout(() => setFeedbackSubmitted(false), 5000);
  };

  const startCamera = async () => {
    setMediaSubMode("record");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setCameraStream(stream);
      if (videoFeedRef.current) {
        videoFeedRef.current.srcObject = stream;
      }
    } catch (err) {
      alert("Unable to access camera. Please allow camera permissions or upload a file instead.");
      setMediaSubMode("choose");
    }
  };

  const startRecording = () => {
    setRecordedChunks([]);
    if (!cameraStream) return;
    try {
      const recorder = new MediaRecorder(cameraStream, { mimeType: "video/webm" });
      mediaRecorderRef.current = recorder;
      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          setRecordedChunks(prev => [...prev, event.data]);
        }
      };
      recorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: "video/webm" });
        const videoUrl = URL.createObjectURL(blob);
        setUploadFile(blob);
        setUploadPreview(videoUrl);
      };
      recorder.start();
      setIsRecording(true);
    } catch (e) {
      alert("Recording not supported on this browser.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadFile(file);
      setUploadPreview(URL.createObjectURL(file));
    }
  };

  const handleProductProofUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductProofImage(file);
      setProductProofPreview(URL.createObjectURL(file));
    }
  };

  const handleUploadToChallenge = (e) => {
    e.preventDefault();
    alert("BIGF challenge entries are submitted through TikTok. Publish your video on TikTok, then paste the TikTok link here.");
  };

  const handleSocialUrlSubmit = (e) => {
    e.preventDefault();

    const url = externalSocialUrl.trim();
    const isTikTok = /^https?:\/\/(www\.)?(tiktok\.com|vm\.tiktok\.com)\//i.test(url);

    if (!url) {
      alert("Please paste your TikTok video link.");
      return;
    }
    if (!isTikTok) {
      alert("Challenge social submissions must use a TikTok video link.");
      return;
    }
    if (!socialCaption.trim()) {
      alert("Please provide a caption for your TikTok post!");
      return;
    }
    if (!productProofImage) {
      alert("Please upload a clear photo of the BIGF product/package you used for this Challenge.");
      return;
    }
    if (!isEmailVerified) {
      alert("Please verify your email address before submitting.");
      return;
    }

    const targetChal = targetChallengeForUpload || challenges[0];
    const newSocialSubmission = {
      id: "submission-" + Date.now(),
      challengeId: targetChal.id,
      challengeTitle: targetChal.title,
      pioneer: displayName || "BIGF User",
      handle: "@user",
      thumbnail: products[1].image,
      caption: socialCaption,
      tiktokUrl: url,
      productProof: productProofPreview,
      status: "PENDING_REVIEW",
      isFeatured: false,
      votes: 0,
      votedByMe: false,
      isFollowing: false,
      createdAt: new Date().toISOString(),
      email: email
    };

    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        submissions: [...(currentUser.submissions || []), newSocialSubmission]
      };
      setCurrentUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      
      const allUsersData = JSON.parse(localStorage.getItem("allUsersData") || "{}");
      if (allUsersData[currentUser.username]) {
        allUsersData[currentUser.username] = updatedUser;
        localStorage.setItem("allUsersData", JSON.stringify(allUsersData));
      }
    }

    setChallengeSubmissions(prev => [newSocialSubmission, ...prev]);
    setExternalSocialUrl("");
    setSocialCaption("");
    setProductProofImage(null);
    setProductProofPreview(null);
    setChallengeActionType(null);
    setShowChallengeActionModal(false);
    setEmail("");
    setIsEmailVerified(false);
    setVerificationCode("");
    setShowVerification(false);
    setDisplayName("");
    alert("🎉 Your Challenge entry has been submitted for review!");
    
    addNotification("Your challenge entry has been submitted for review! 📝", "info");
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    alert("Community posting is not available in V1. Please submit your entry through a Challenge.");
    setShowFreestyleModal(false);
  };

  const handleFollowUser = (postId) => {
    alert("Follow feature is not available in V1.");
  };

  const handleVotePost = (postId) => {
    alert("Website voting is not used in V1. Winner ranking is based on TikTok Likes.");
  };

  const handleLikeFeedItem = (postId) => {
    alert("Like feature is not available in V1.");
  };

  const handleRepost = (postId) => {
    alert("Repost feature is not available in V1.");
  };

  const handleAddComment = (postId, e) => {
    e.preventDefault();
    alert("Comment feature is not available in V1.");
  };

  const handleOrderProduct = (prod) => {
    alert("📦 BIGF products are available at your local retailers. Thank you for your interest!");
  };

  const handleSaveEditProfile = (e) => {
    e.preventDefault();
    
    const updatedProfile = {
      ...currentUser,
      name: editName || currentUser.name,
      bio: editBio || currentUser.bio,
      avatar: editAvatar || currentUser.avatar,
      handle: editHandle || currentUser.handle,
    };
    
    setCurrentUser(updatedProfile);
    setUserProfile(updatedProfile);
    localStorage.setItem("currentUser", JSON.stringify(updatedProfile));
    localStorage.setItem("bigf_user_profile", JSON.stringify(updatedProfile));
    
    const allUsersData = JSON.parse(localStorage.getItem("allUsersData") || "{}");
    if (allUsersData[currentUser?.username]) {
      allUsersData[currentUser.username] = updatedProfile;
      localStorage.setItem("allUsersData", JSON.stringify(allUsersData));
    }
    
    setShowEditProfileModal(false);
    setIsNewUser(false);
  };

  const handleAvatarFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApproveSubmission = (submissionId) => {
    setChallengeSubmissions(prev => prev.map(item => 
      item.id === submissionId ? { ...item, status: "APPROVED" } : item
    ));
    alert("✅ Submission approved!");
  };

  const handleRejectSubmission = (submissionId) => {
    setChallengeSubmissions(prev => prev.map(item => 
      item.id === submissionId ? { ...item, status: "REJECTED" } : item
    ));
    alert("❌ Submission rejected.");
  };

  const handleFeatureEntry = (submissionId) => {
    setChallengeSubmissions(prev => prev.map(item => 
      item.id === submissionId ? { ...item, isFeatured: !item.isFeatured } : item
    ));
    alert("⭐ Featured status toggled.");
  };

  const handleDeletePost = (postId) => {
    if (window.confirm("Are you sure you want to delete this post as Admin?")) {
      setFeaturedEntries(prev => prev.filter(v => v.id !== postId));
    }
  };

  const handleDeleteChallengeSubmission = (submissionId) => {
    if (window.confirm("Delete this challenge submission as Admin?")) {
      setChallengeSubmissions(prev => prev.filter(item => item.id !== submissionId));
    }
  };

  const handleDeleteChallenge = (chalId) => {
    if (window.confirm("Delete this challenge from the hub?")) {
      setChallenges(prev => prev.filter(c => c.id !== chalId));
    }
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {};

  const filteredChallenges = selectedCategory === "All"
    ? challenges
    : challenges.filter(c => c.category === selectedCategory);

  const topLeaderboardEntries = [...challengeSubmissions]
    .filter(s => s.status === "APPROVED")
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 3);

  const WelcomeModal = () => {
    return (
      <div style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(10px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 99999,
        padding: "20px"
      }}>
        <div style={{
          background: appSettings.darkMode ? "#1e1b18" : "#ffffff",
          borderRadius: "28px",
          maxWidth: "440px",
          width: "100%",
          padding: "32px",
          border: "2px solid #f97316",
          textAlign: "center",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
        }}>
          <div style={{ fontSize: "64px", marginBottom: "12px" }}>👋</div>
          <h2 style={{
            fontSize: "24px",
            fontWeight: "1000",
            color: appSettings.darkMode ? "#fff" : "#17120f",
            margin: "0 0 8px 0"
          }}>
            Welcome to BIGF Kenya!
          </h2>
          <p style={{
            fontSize: "14px",
            color: "#a8a29e",
            lineHeight: "1.6",
            margin: "0 0 20px 0"
          }}>
            Discover our food, join the Challenge, and be part of the BIGF community.
          </p>
          
          <div style={{
            background: appSettings.darkMode ? "#141210" : "#fff7ed",
            borderRadius: "16px",
            padding: "16px",
            marginBottom: "20px",
            border: "1px solid #fed7aa",
            textAlign: "left"
          }}>
            <div style={{ fontSize: "13px", fontWeight: "700", color: appSettings.darkMode ? "#fff" : "#17120f" }}>
              🍜 To participate in a Challenge:
            </div>
            <div style={{ fontSize: "12px", color: "#a8a29e", marginTop: "8px" }}>
              1. Verify your email<br />
              2. Cook with BIGF<br />
              3. Post on TikTok<br />
              4. Submit your entry
            </div>
          </div>
          
          <button
            onClick={() => {
              setIsNewUser(false);
            }}
            style={{
              background: "linear-gradient(135deg, #f97316, #c2410c)",
              color: "#fff",
              border: "none",
              padding: "14px 28px",
              borderRadius: "14px",
              fontWeight: "1000",
              fontSize: "14px",
              cursor: "pointer",
              width: "100%"
            }}
          >
            🚀 Explore BIGF
          </button>
        </div>
      </div>
    );
  };

  // FIXED: Auth Modal Component - Using useMemo to prevent re-renders
  const AuthModal = useMemo(() => {
    const ModalContent = () => (
      <div style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(10px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 99999,
        padding: "20px"
      }}>
        <div style={{
          background: appSettings.darkMode ? "#1e1b18" : "#ffffff",
          borderRadius: "28px",
          maxWidth: "440px",
          width: "100%",
          padding: "32px",
          border: "2px solid #f97316",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px"
          }}>
            <h2 style={{
              fontSize: "22px",
              fontWeight: "1000",
              color: appSettings.darkMode ? "#fff" : "#17120f",
              margin: 0
            }}>
              {authMode === "login" ? "🔐 Login" : "📝 Create Account"}
            </h2>
            <button
              onClick={() => {
                setShowAuthModal(false);
                setLoginUsername("");
                setSignupUsername("");
                setSignupDisplayName("");
              }}
              style={{
                background: "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
                color: appSettings.darkMode ? "#fff" : "#17120f"
              }}
            >
              ✕
            </button>
          </div>

          {authMode === "login" ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <input
                type="text"
                placeholder="Enter your username"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #fed7aa",
                  backgroundColor: appSettings.darkMode ? "#141210" : "#fff",
                  color: appSettings.darkMode ? "#fff" : "#000",
                  fontSize: "14px",
                  boxSizing: "border-box",
                  outline: "none"
                }}
              />
              <button
                onClick={handleLogin}
                style={{
                  background: "#f97316",
                  color: "#fff",
                  border: "none",
                  padding: "12px",
                  borderRadius: "10px",
                  fontWeight: "700",
                  fontSize: "14px",
                  cursor: "pointer",
                  width: "100%"
                }}
              >
                Login
              </button>
              <p style={{ fontSize: "13px", color: "#a8a29e", textAlign: "center", margin: "8px 0 0 0" }}>
                Don't have an account?{" "}
                <span
                  onClick={() => setAuthMode("signup")}
                  style={{ color: "#f97316", fontWeight: "700", cursor: "pointer" }}
                >
                  Sign up
                </span>
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <input
                type="text"
                placeholder="Choose a username"
                value={signupUsername}
                onChange={(e) => setSignupUsername(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #fed7aa",
                  backgroundColor: appSettings.darkMode ? "#141210" : "#fff",
                  color: appSettings.darkMode ? "#fff" : "#000",
                  fontSize: "14px",
                  boxSizing: "border-box",
                  outline: "none"
                }}
              />
              <input
                type="text"
                placeholder="Your display name"
                value={signupDisplayName}
                onChange={(e) => setSignupDisplayName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #fed7aa",
                  backgroundColor: appSettings.darkMode ? "#141210" : "#fff",
                  color: appSettings.darkMode ? "#fff" : "#000",
                  fontSize: "14px",
                  boxSizing: "border-box",
                  outline: "none"
                }}
              />
              <button
                onClick={handleSignup}
                style={{
                  background: "#f97316",
                  color: "#fff",
                  border: "none",
                  padding: "12px",
                  borderRadius: "10px",
                  fontWeight: "700",
                  fontSize: "14px",
                  cursor: "pointer",
                  width: "100%"
                }}
              >
                Create Account
              </button>
              <p style={{ fontSize: "13px", color: "#a8a29e", textAlign: "center", margin: "8px 0 0 0" }}>
                Already have an account?{" "}
                <span
                  onClick={() => setAuthMode("login")}
                  style={{ color: "#f97316", fontWeight: "700", cursor: "pointer" }}
                >
                  Login
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    );
    
    return showAuthModal ? <ModalContent /> : null;
  }, [showAuthModal, authMode, loginUsername, signupUsername, signupDisplayName, appSettings.darkMode]);

  return (
    <div style={{ 
      position: "relative", 
      minHeight: "100vh", 
      fontFamily: "system-ui, sans-serif", 
      padding: "20px", 
      paddingBottom: "110px", 
      backgroundColor: appSettings.darkMode ? "#121212" : "#fff7ed", 
      color: appSettings.darkMode ? "#f5f5f4" : "#17120f", 
      transition: "background-color 0.3s" 
    }}>
      
      {isNewUser && <WelcomeModal />}
      {AuthModal}

      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
        {slots.map((slot) => (
          <div key={slot.id} style={{ position: "absolute", ...slot.pos, width: "200px", height: "140px", borderRadius: "18px", overflow: "hidden", border: "1px solid rgba(249,115,22,0.2)", opacity: slot.visible ? 0.28 : 0, transition: "opacity 1.5s ease-in-out" }}>
            <img src={slot.img} alt="Background noodle" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        ))}
      </div>

      <header style={{ maxWidth: "1100px", margin: "0 auto 20px auto", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", background: appSettings.darkMode ? "#1e1b18" : "rgba(255,255,255,0.96)", borderRadius: "24px", border: "1px solid rgba(249,115,22,0.25)", position: "relative", zIndex: 10 }}>
        <div 
          onClick={() => { setSelectedHubChallenge(null); setActiveNavTab("home"); }} 
          style={{ display: "flex", alignItems: "center", gap: "14px", cursor: "pointer", userSelect: "none" }}
          title="BIGF Kenya"
        >
          <div style={{ width: "48px", height: "48px", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #f97316 0%, #c2410c 100%)", color: "#FFFFFF", fontWeight: "950", fontSize: "14px" }}>
            BIG F
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: "16px", fontWeight: "900", color: appSettings.darkMode ? "#fff" : "#17120f" }}>BIGF KENYA</h1>
            <span style={{ fontSize: "10px", color: "#c2410c", fontWeight: "800", textTransform: "uppercase" }}>Official Creator & Recipe Hub</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {isAdmin && (
            <button onClick={() => setActiveNavTab("admin")} style={{ background: "#dc2626", color: "#fff", border: "none", padding: "8px 14px", borderRadius: "12px", fontWeight: "900", fontSize: "12px", cursor: "pointer" }}>
              🛠️ Admin Dashboard
            </button>
          )}

          <button onClick={() => { setSelectedHubChallenge(null); setActiveNavTab("challenge"); }} style={{ background: appSettings.darkMode ? "#2a2421" : "#fff7ed", color: "#c2410c", border: "1px solid #fed7aa", padding: "8px 14px", borderRadius: "12px", fontWeight: "900", fontSize: "12px", cursor: "pointer" }}>
            🏆 Challenge Hub
          </button>

          {/* Notification Button */}
          <div style={{ position: "relative", display: "inline-block" }}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)} 
              style={{ 
                backgroundColor: appSettings.darkMode ? "#2a2421" : "rgba(249,115,22,.08)", 
                border: "1px solid rgba(249,115,22,.3)", 
                padding: "9px 12px", 
                borderRadius: "12px", 
                fontWeight: "800", 
                cursor: "pointer", 
                color: "#c2410c",
                position: "relative"
              }}
            >
              🔔
              {unreadCount > 0 && (
                <span style={{
                  position: "absolute",
                  top: "-4px",
                  right: "-4px",
                  background: "#ef4444",
                  color: "#fff",
                  borderRadius: "50%",
                  width: "18px",
                  height: "18px",
                  fontSize: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "900"
                }}>
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div style={{
                position: "absolute",
                top: "45px",
                right: "0",
                width: "320px",
                maxHeight: "400px",
                overflowY: "auto",
                background: appSettings.darkMode ? "#1e1b18" : "#ffffff",
                borderRadius: "16px",
                border: "1px solid rgba(249,115,22,0.3)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                zIndex: 100,
                padding: "8px 0"
              }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 16px",
                  borderBottom: "1px solid rgba(249,115,22,0.1)"
                }}>
                  <span style={{ fontWeight: "1000", fontSize: "14px", color: appSettings.darkMode ? "#fff" : "#17120f" }}>
                    Notifications
                  </span>
                  {notifications.length > 0 && (
                    <button 
                      onClick={markAllAsRead}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#f97316",
                        fontSize: "11px",
                        fontWeight: "700",
                        cursor: "pointer"
                      }}
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                {notifications.length === 0 ? (
                  <div style={{
                    padding: "30px 16px",
                    textAlign: "center",
                    color: "#a8a29e",
                    fontSize: "13px"
                  }}>
                    No notifications yet
                  </div>
                ) : (
                  notifications.map(notification => (
                    <div 
                      key={notification.id}
                      onClick={() => markAsRead(notification.id)}
                      style={{
                        padding: "10px 16px",
                        borderBottom: "1px solid rgba(249,115,22,0.05)",
                        background: notification.read ? "transparent" : "rgba(249,115,22,0.05)",
                        cursor: "pointer",
                        transition: "background 0.2s"
                      }}
                    >
                      <div style={{
                        fontSize: "12px",
                        fontWeight: notification.read ? "500" : "700",
                        color: appSettings.darkMode ? "#f5f5f4" : "#17120f"
                      }}>
                        {notification.message}
                      </div>
                      <div style={{
                        fontSize: "10px",
                        color: "#a8a29e",
                        marginTop: "4px"
                      }}>
                        {new Date(notification.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          <button onClick={() => setShowSettingsModal(true)} style={{ backgroundColor: appSettings.darkMode ? "#2a2421" : "rgba(249,115,22,.08)", border: "1px solid rgba(249,115,22,.3)", padding: "9px 12px", borderRadius: "12px", fontWeight: "800", cursor: "pointer", color: "#c2410c" }}>
            ⚙️
          </button>
        </div>
      </header>

      <main style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 10 }}>
        {/* ADMIN DASHBOARD VIEW */}
        {activeNavTab === "admin" && (
          isAdmin ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div style={{ background: appSettings.darkMode ? "#1e1b18" : "#ffffff", padding: "24px", borderRadius: "24px", border: "2px solid #dc2626", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                <div>
                  <span style={{ background: "#fee2e2", color: "#991b1b", padding: "4px 10px", borderRadius: "8px", fontSize: "10px", fontWeight: "1000", textTransform: "uppercase" }}>Restricted Admin Access</span>
                  <h2 style={{ margin: "6px 0 2px 0", fontSize: "24px", fontWeight: "1000", color: appSettings.darkMode ? "#fff" : "#17120f" }}>🛠️ BIGF Admin Control Center</h2>
                  <p style={{ margin: 0, fontSize: "13px", color: "#a8a29e", fontWeight: "700" }}>Manage challenges, review submissions, and moderate featured content.</p>
                </div>
                <button onClick={handleLogoutAdmin} style={{ background: "#dc2626", color: "#fff", border: "none", padding: "10px 18px", borderRadius: "12px", fontWeight: "1000", fontSize: "12px", cursor: "pointer" }}>
                  🚪 Logout Admin
                </button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
                <div style={{ background: appSettings.darkMode ? "#1e1b18" : "#ffffff", padding: "20px", borderRadius: "20px", border: "1px solid #fed7aa" }}>
                  <span style={{ fontSize: "11px", color: "#a8a29e", fontWeight: "900", textTransform: "uppercase" }}>Active Challenges</span>
                  <div style={{ fontSize: "28px", fontWeight: "1000", color: "#c2410c", margin: "6px 0 2px" }}>{challenges.length}</div>
                </div>
                <div style={{ background: appSettings.darkMode ? "#1e1b18" : "#ffffff", padding: "20px", borderRadius: "20px", border: "1px solid #fed7aa" }}>
                  <span style={{ fontSize: "11px", color: "#a8a29e", fontWeight: "900", textTransform: "uppercase" }}>Pending Review</span>
                  <div style={{ fontSize: "28px", fontWeight: "1000", color: "#c2410c", margin: "6px 0 2px" }}>
                    {challengeSubmissions.filter(s => s.status === "PENDING_REVIEW").length}
                  </div>
                </div>
                <div style={{ background: appSettings.darkMode ? "#1e1b18" : "#ffffff", padding: "20px", borderRadius: "20px", border: "1px solid #fed7aa" }}>
                  <span style={{ fontSize: "11px", color: "#a8a29e", fontWeight: "900", textTransform: "uppercase" }}>Featured Entries</span>
                  <div style={{ fontSize: "28px", fontWeight: "1000", color: "#c2410c", margin: "6px 0 2px" }}>
                    {challengeSubmissions.filter(s => s.isFeatured).length}
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px" }}>
                <div style={{ background: appSettings.darkMode ? "#1e1b18" : "#ffffff", padding: "24px", borderRadius: "24px", border: "2px solid #f97316" }}>
                  <h3 style={{ margin: "0 0 4px 0", fontSize: "18px", fontWeight: "1000", color: appSettings.darkMode ? "#fff" : "#17120f" }}>🏆 Create New Cooking Challenge</h3>
                  <p style={{ margin: "0 0 16px 0", fontSize: "12px", color: "#a8a29e", fontWeight: "700" }}>Launch a brand new challenge for the community to participate.</p>
                  
                  <form onSubmit={handleCreateChallenge} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      <div>
                        <label style={{ fontSize: "11px", fontWeight: "1000", display: "block", marginBottom: "4px" }}>Challenge Title</label>
                        <input
                          type="text"
                          placeholder="e.g., Spicy Noodle Battle"
                          value={newChalTitle}
                          onChange={(e) => setNewChalTitle(e.target.value)}
                          style={{ width: "100%", padding: "10px", borderRadius: "10px", border: "1px solid #fed7aa", backgroundColor: appSettings.darkMode ? "#141210" : "#fff", color: appSettings.darkMode ? "#fff" : "#000", fontSize: "12px", fontWeight: "700", boxSizing: "border-box" }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: "11px", fontWeight: "1000", display: "block", marginBottom: "4px" }}>Prize Reward</label>
                        <input
                          type="text"
                          placeholder="e.g., KSh 10,000 Cash"
                          value={newChalPrize}
                          onChange={(e) => setNewChalPrize(e.target.value)}
                          style={{ width: "100%", padding: "10px", borderRadius: "10px", border: "1px solid #fed7aa", backgroundColor: appSettings.darkMode ? "#141210" : "#fff", color: appSettings.darkMode ? "#fff" : "#000", fontSize: "12px", fontWeight: "700", boxSizing: "border-box" }}
                        />
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      <div>
                        <label style={{ fontSize: "11px", fontWeight: "1000", display: "block", marginBottom: "4px" }}>Duration (Days)</label>
                        <input
                          type="number"
                          value={newChalDays}
                          onChange={(e) => setNewChalDays(e.target.value)}
                          style={{ width: "100%", padding: "10px", borderRadius: "10px", border: "1px solid #fed7aa", backgroundColor: appSettings.darkMode ? "#141210" : "#fff", color: appSettings.darkMode ? "#fff" : "#000", fontSize: "12px", fontWeight: "700", boxSizing: "border-box" }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: "11px", fontWeight: "1000", display: "block", marginBottom: "4px" }}>Category</label>
                        <select
                          value={newChalCategory}
                          onChange={(e) => setNewChalCategory(e.target.value)}
                          style={{ width: "100%", padding: "10px", borderRadius: "10px", border: "1px solid #fed7aa", backgroundColor: appSettings.darkMode ? "#141210" : "#fff", color: appSettings.darkMode ? "#fff" : "#000", fontSize: "12px", fontWeight: "700" }}
                        >
                          {CATEGORIES.filter(c => c !== "All").map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: "11px", fontWeight: "1000", display: "block", marginBottom: "4px" }}>Challenge Description</label>
                      <textarea
                        placeholder="Describe the rules and how users can win..."
                        rows={2}
                        value={newChalDesc}
                        onChange={(e) => setNewChalDesc(e.target.value)}
                        style={{ width: "100%", padding: "10px", borderRadius: "10px", border: "1px solid #fed7aa", backgroundColor: appSettings.darkMode ? "#141210" : "#fff", color: appSettings.darkMode ? "#fff" : "#000", fontSize: "12px", fontWeight: "700", boxSizing: "border-box", resize: "none" }}
                      />
                    </div>

                    <button type="submit" style={{ background: "#f97316", color: "#fff", border: "none", padding: "12px", borderRadius: "12px", fontWeight: "1000", fontSize: "13px", cursor: "pointer" }}>
                      🚀 Publish Challenge to Hub
                    </button>
                  </form>
                </div>

                <div style={{ background: appSettings.darkMode ? "#1e1b18" : "#ffffff", padding: "24px", borderRadius: "24px", border: "1px solid #fed7aa" }}>
                  <h3 style={{ margin: "0 0 16px 0", fontSize: "18px", fontWeight: "1000", color: appSettings.darkMode ? "#fff" : "#17120f" }}>🛡️ Submission Moderation</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {challengeSubmissions.map(post => (
                      <div key={post.id} style={{ background: appSettings.darkMode ? "#141210" : "#fff7ed", border: "1px solid #fed7aa", borderRadius: "16px", padding: "14px", display: "flex", flexDirection: "column", gap: "8px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px" }}>
                          <div>
                            <div style={{ fontSize: "12px", fontWeight: "1000", color: appSettings.darkMode ? "#fff" : "#17120f" }}>
                              {post.pioneer} ({post.handle})
                            </div>
                            <div style={{ fontSize: "11px", color: "#a8a29e", fontWeight: "800" }}>
                              {post.challengeTitle}
                            </div>
                            <div style={{ fontSize: "10px", color: post.status === "APPROVED" ? "#10b981" : post.status === "REJECTED" ? "#ef4444" : "#f59e0b", fontWeight: "900" }}>
                              Status: {post.status}
                            </div>
                            {post.email && (
                              <div style={{ fontSize: "9px", color: "#a8a29e" }}>
                                📧 {post.email}
                              </div>
                            )}
                          </div>
                          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                            {post.status === "PENDING_REVIEW" && (
                              <>
                                <button onClick={() => handleApproveSubmission(post.id)} style={{ background: "#10b981", color: "#fff", border: "none", padding: "4px 10px", borderRadius: "6px", fontWeight: "700", fontSize: "10px", cursor: "pointer" }}>
                                  ✅ Approve
                                </button>
                                <button onClick={() => handleRejectSubmission(post.id)} style={{ background: "#ef4444", color: "#fff", border: "none", padding: "4px 10px", borderRadius: "6px", fontWeight: "700", fontSize: "10px", cursor: "pointer" }}>
                                  ❌ Reject
                                </button>
                              </>
                            )}
                            <button onClick={() => handleFeatureEntry(post.id)} style={{ background: post.isFeatured ? "#f59e0b" : "#6366f1", color: "#fff", border: "none", padding: "4px 10px", borderRadius: "6px", fontWeight: "700", fontSize: "10px", cursor: "pointer" }}>
                              {post.isFeatured ? "⭐ Featured" : "⭐ Feature"}
                            </button>
                            <button onClick={() => handleDeleteChallengeSubmission(post.id)} style={{ background: "#fee2e2", color: "#dc2626", border: "1px solid #f87171", padding: "4px 10px", borderRadius: "6px", fontWeight: "700", fontSize: "10px", cursor: "pointer" }}>
                              Delete
                            </button>
                          </div>
                        </div>
                        {post.productProof && (
                          <div style={{ fontSize: "10px", color: "#a8a29e" }}>
                            📷 Product Proof uploaded
                          </div>
                        )}
                        {post.tiktokUrl && (
                          <a href={post.tiktokUrl} target="_blank" rel="noreferrer" style={{ fontSize: "10px", color: "#3b82f6", textDecoration: "none" }}>
                            🎵 View TikTok
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ background: appSettings.darkMode ? "#1e1b18" : "#ffffff", padding: "40px", borderRadius: "28px", textAlign: "center", border: "2px solid #dc2626", maxWidth: "480px", margin: "40px auto" }}>
              <div style={{ fontSize: "48px", marginBottom: "12px" }}>🔒</div>
              <h2 style={{ fontSize: "22px", fontWeight: "1000", color: "#dc2626", margin: "0 0 8px 0" }}>Access Restricted</h2>
              <p style={{ fontSize: "13px", color: "#a8a29e", margin: "0 0 20px 0", fontWeight: "700" }}>You must log in with administrative credentials to access the BIGF Admin Dashboard.</p>
              <button onClick={() => setShowAdminLoginModal(true)} style={{ background: "#dc2626", color: "#fff", border: "none", padding: "12px 24px", borderRadius: "12px", fontWeight: "1000", fontSize: "13px", cursor: "pointer" }}>
                🔐 Open Admin Login
              </button>
            </div>
          )
        )}

        {/* HOME VIEW */}
        {activeNavTab === "home" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
            {/* 01 — BRAND HERO */}
            <section style={{ background: "linear-gradient(135deg, #17120f 0%, #2a1510 50%, #9a3412 100%)", borderRadius: "32px", padding: "48px 32px", color: "#ffffff", boxShadow: "0 20px 50px rgba(124,45,18,0.2)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", right: "-20px", bottom: "-30px", fontSize: "140px", opacity: 0.15, pointerEvents: "none" }}>🍜</div>
              
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "12px" }}>
                <span style={{ background: "rgba(249,115,22,0.25)", color: "#fed7aa", padding: "6px 14px", borderRadius: "999px", fontSize: "11px", fontWeight: "1000", letterSpacing: "1px", textTransform: "uppercase" }}>
                  🍜 BIG F — THE FAMILY FOOD COMPANY
                </span>
                <span style={{ background: "#f97316", color: "#fff", padding: "6px 14px", borderRadius: "999px", fontSize: "11px", fontWeight: "1000", letterSpacing: "1px", textTransform: "uppercase" }}>
                  🔥 TIKTOK CHALLENGES ACTIVE
                </span>
              </div>
              
              <h2 style={{ fontSize: "clamp(26px, 4.5vw, 46px)", fontWeight: "1000", margin: "16px 0 12px", lineHeight: "1.15" }}>
                EVERYDAY FOOD MADE FOR REAL FAMILY LIFE. <br />
                <span style={{ color: "#fb923c" }}>SIMPLE TO COOK, YOURS TO MAKE.</span>
              </h2>
              
              <p style={{ fontSize: "15px", color: "#f5f5f4", margin: "0 0 16px 0", maxWidth: "620px", lineHeight: "1.6", fontWeight: "600" }}>
                ONE FAMILY, DIFFERENT FLAVOURS. MADE FOR THE WAY YOU EAT.
              </p>

              <p style={{ fontSize: "13px", color: "#fed7aa", margin: "0 0 24px 0", maxWidth: "620px", lineHeight: "1.5", fontWeight: "700" }}>
                🏆 <strong style={{ color: "#fff" }}>Want to win cash prizes?</strong> Cook your favorite BIGF noodles, share your creative recipe or video on TikTok, and submit your link to join our active community challenges!
              </p>
              
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <button onClick={() => { setSelectedHubChallenge(null); setActiveNavTab("challenge"); }} style={{ background: "#f97316", color: "#17120f", border: "none", padding: "14px 24px", borderRadius: "12px", fontWeight: "1000", fontSize: "13px", cursor: "pointer", boxShadow: "0 4px 15px rgba(249,115,22,0.4)" }}>
                  🏆 Join the Challenge
                </button>
                <button onClick={() => document.getElementById("bigf-products")?.scrollIntoView({ behavior: "smooth" })} style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", padding: "14px 24px", borderRadius: "12px", fontWeight: "1000", fontSize: "13px", cursor: "pointer" }}>
                  🔥 Explore Our Food
                </button>
              </div>
            </section>

            {/* 02 — CURRENT CHALLENGE PREVIEW */}
            <section style={{ background: appSettings.darkMode ? "#1e1b18" : "#fffaf5", border: "2px solid #fed7aa", borderRadius: "28px", padding: "32px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
                <div>
                  <span style={{ color: "#c2410c", fontSize: "10px", fontWeight: "1000", letterSpacing: "1.2px", textTransform: "uppercase" }}>CURRENT CAMPAIGN</span>
                  <h3 style={{ color: appSettings.darkMode ? "#fff" : "#17120f", fontSize: "24px", fontWeight: "1000", margin: "2px 0 0 0" }}>
                    🏆 {challenges.length > 0 ? challenges[0].title : "No Active Challenge"}
                  </h3>
                </div>
                <span style={{ fontSize: "12px", color: "#a8a29e", fontWeight: "700" }}>
                  {challenges.length > 0 ? "⏳ " + challenges[0].daysLeft + " days remaining" : ""}
                </span>
              </div>
              {challenges.length > 0 && (
                <>
                  <p style={{ fontSize: "13px", color: appSettings.darkMode ? "#d6d3d1" : "#334155", lineHeight: "1.5", fontWeight: "700" }}>
                    {challenges[0].description}
                  </p>
                  <div style={{ marginTop: "12px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    <span style={{ background: "#fef3c7", color: "#92400e", padding: "4px 10px", borderRadius: "8px", fontSize: "11px", fontWeight: "1000" }}>
                      🏆 {challenges[0].prize}
                    </span>
                    <button onClick={() => { setSelectedHubChallenge(null); setActiveNavTab("challenge"); }} style={{ background: "#f97316", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "10px", fontWeight: "1000", fontSize: "12px", cursor: "pointer" }}>
                      Join Challenge →
                    </button>
                  </div>
                </>
              )}
            </section>

            {/* 03 — OUR FOOD PREVIEW */}
            <section id="bigf-products" style={{ background: appSettings.darkMode ? "#1e1b18" : "#fffaf5", border: "2px solid #fed7aa", borderRadius: "28px", padding: "32px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
                <div>
                  <span style={{ color: "#c2410c", fontSize: "10px", fontWeight: "1000", letterSpacing: "1.2px", textTransform: "uppercase" }}>OUR FOOD</span>
                  <h3 style={{ color: appSettings.darkMode ? "#fff" : "#17120f", fontSize: "24px", fontWeight: "1000", margin: "2px 0 0 0" }}>BIGF Product Range</h3>
                </div>
                <span style={{ fontSize: "12px", color: "#a8a29e", fontWeight: "700" }}>Different Flavours, One Family</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "18px" }}>
                {products.map(prod => (
                  <div key={prod.id} style={{ background: appSettings.darkMode ? "#141210" : "#ffffff", border: "1px solid #fed7aa", borderRadius: "20px", overflow: "hidden", padding: "18px", display: "flex", flexDirection: "column" }}>
                    <div>
                      <img src={prod.image} alt={prod.name} style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "14px", marginBottom: "14px", backgroundColor: "#fef3c7" }} />
                      <span style={{ background: "#fef3c7", color: "#92400e", padding: "4px 10px", borderRadius: "8px", fontSize: "10px", fontWeight: "1000" }}>{prod.badge}</span>
                      <h4 style={{ color: appSettings.darkMode ? "#fff" : "#17120f", fontSize: "17px", fontWeight: "1000", margin: "8px 0 6px" }}>{prod.name}</h4>
                      <p style={{ color: "#a8a29e", fontSize: "12px", lineHeight: "1.5", margin: "0 0 14px" }}>{prod.description}</p>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(249,115,22,0.15)", paddingTop: "12px" }}>
                      <span style={{ color: "#a8a29e", fontSize: "12px", fontWeight: "600" }}>Available at your local retailer</span>
                      <button onClick={() => handleOrderProduct(prod)} style={{ background: "transparent", color: "#c2410c", border: "1px solid #c2410c", padding: "8px 12px", borderRadius: "8px", fontWeight: "600", fontSize: "11px", cursor: "pointer" }}>
                        Learn More
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 04 — FEATURED CREATIONS PREVIEW */}
            {challengeSubmissions.filter(s => s.isFeatured).length > 0 && (
              <section style={{ background: appSettings.darkMode ? "#1e1b18" : "#fffaf5", border: "1px solid #fed7aa", borderRadius: "28px", padding: "32px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
                  <div>
                    <span style={{ color: "#c2410c", fontSize: "10px", fontWeight: "1000", letterSpacing: "1.5px", textTransform: "uppercase" }}>FEATURED CREATIONS</span>
                    <h3 style={{ color: appSettings.darkMode ? "#fff" : "#17120f", fontSize: "24px", fontWeight: "1000", margin: "2px 0 0 0" }}>⭐ Featured Challenge Entries</h3>
                  </div>
                  <button onClick={() => { setSelectedHubChallenge(null); setActiveNavTab("challenge"); }} style={{ background: "#f97316", color: "#fff", border: "none", padding: "8px 14px", borderRadius: "10px", fontWeight: "1000", fontSize: "11px", cursor: "pointer" }}>
                    View All →
                  </button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
                  {challengeSubmissions.filter(s => s.isFeatured).slice(0, 3).map((entry) => (
                    <div key={entry.id} style={{ background: appSettings.darkMode ? "#141210" : "#ffffff", border: "1px solid #fed7aa", borderRadius: "20px", padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
                      <div style={{ width: "100%", height: "150px", borderRadius: "14px", overflow: "hidden", backgroundColor: "#000" }}>
                        <img src={entry.thumbnail} alt={entry.pioneer} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      <div>
                        <div style={{ fontSize: "13px", fontWeight: "1000", color: appSettings.darkMode ? "#fff" : "#17120f" }}>{entry.pioneer}</div>
                        <div style={{ fontSize: "11px", color: "#c2410c", fontWeight: "900" }}>{entry.challengeTitle}</div>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(249,115,22,0.15)", paddingTop: "10px" }}>
                        <span style={{ fontSize: "11px", color: "#a8a29e" }}>
                          {entry.tiktokUrl ? "🎵 View on TikTok" : "⭐ Featured"}
                        </span>
                        {entry.tiktokUrl && (
                          <a href={entry.tiktokUrl} target="_blank" rel="noreferrer" style={{ background: "#17120f", color: "#fff", padding: "6px 12px", borderRadius: "8px", fontSize: "10px", fontWeight: "700", textDecoration: "none" }}>
                            Watch →
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 05 — SHORT BIGF STORY */}
            <section style={{ background: appSettings.darkMode ? "#1e1b18" : "#ffffff", border: "2px solid #fed7aa", borderRadius: "28px", padding: "36px 32px" }}>
              <div style={{ textAlign: "center", marginBottom: "28px" }}>
                <span style={{ background: "#fef3c7", color: "#92400e", padding: "6px 14px", borderRadius: "999px", fontSize: "10px", fontWeight: "1000", letterSpacing: "1.2px", textTransform: "uppercase" }}>
                  📖 OUR STORY
                </span>
                <h3 style={{ fontSize: "26px", fontWeight: "1000", margin: "10px 0 6px 0", color: appSettings.darkMode ? "#fff" : "#17120f" }}>
                  Every Big Future Starts with a Full Stomach
                </h3>
                <p style={{ fontSize: "13px", color: "#a8a29e", maxWidth: "640px", margin: "0 auto", fontWeight: "700", lineHeight: "1.6" }}>
                  BIGF is a family food company built on the belief that good food brings people together. 
                  Simple to cook, yours to make — we create everyday food made for real family life.
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
                <div style={{ background: appSettings.darkMode ? "#141210" : "#fff7ed", padding: "22px", borderRadius: "20px", border: "1px solid #fed7aa" }}>
                  <div style={{ fontSize: "28px", marginBottom: "8px" }}>🍜</div>
                  <h4 style={{ fontSize: "16px", fontWeight: "1000", color: appSettings.darkMode ? "#fff" : "#17120f", margin: "0 0 6px 0" }}>Everyday Quality</h4>
                  <p style={{ fontSize: "12px", color: "#a8a29e", lineHeight: "1.6", fontWeight: "700", margin: 0 }}>
                    Reliable, high-quality ingredients blended to deliver rich, comforting flavors you can trust for every meal.
                  </p>
                </div>

                <div style={{ background: appSettings.darkMode ? "#141210" : "#fff7ed", padding: "22px", borderRadius: "20px", border: "1px solid #fed7aa" }}>
                  <div style={{ fontSize: "28px", marginBottom: "8px" }}>👨‍👩‍👧‍👦</div>
                  <h4 style={{ fontSize: "16px", fontWeight: "1000", color: appSettings.darkMode ? "#fff" : "#17120f", margin: "0 0 6px 0" }}>One Family, Different Flavours</h4>
                  <p style={{ fontSize: "12px", color: "#a8a29e", lineHeight: "1.6", fontWeight: "700", margin: 0 }}>
                    Options tailored for everyone in the household—made specifically for the way your family eats.
                  </p>
                </div>

                <div style={{ background: appSettings.darkMode ? "#141210" : "#fff7ed", padding: "22px", borderRadius: "20px", border: "1px solid #fed7aa" }}>
                  <div style={{ fontSize: "28px", marginBottom: "8px" }}>🏆</div>
                  <h4 style={{ fontSize: "16px", fontWeight: "1000", color: appSettings.darkMode ? "#fff" : "#17120f", margin: "0 0 6px 0" }}>Engaging Community</h4>
                  <p style={{ fontSize: "12px", color: "#a8a29e", lineHeight: "1.6", fontWeight: "700", margin: 0 }}>
                    Beyond great meals, we bring people together through fun creator challenges, rewards, and shared experiences.
                  </p>
                </div>
              </div>
            </section>

            {/* 06 — FOOTER */}
            <section style={{ background: appSettings.darkMode ? "#1e1b18" : "#ffffff", border: "2px solid #fed7aa", borderRadius: "32px", padding: "36px 32px", textAlign: "center" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
                <a href="#" style={{ color: "#c2410c", fontWeight: "700", fontSize: "13px", textDecoration: "none" }}>Our Food</a>
                <a href="#" style={{ color: "#c2410c", fontWeight: "700", fontSize: "13px", textDecoration: "none" }}>Challenges</a>
                <a href="#" style={{ color: "#c2410c", fontWeight: "700", fontSize: "13px", textDecoration: "none" }}>About BIGF</a>
                <a href="#" style={{ color: "#c2410c", fontWeight: "700", fontSize: "13px", textDecoration: "none" }}>Challenge Rules</a>
                <a href="#" style={{ color: "#c2410c", fontWeight: "700", fontSize: "13px", textDecoration: "none" }}>Terms</a>
                <a href="#" style={{ color: "#c2410c", fontWeight: "700", fontSize: "13px", textDecoration: "none" }}>Privacy</a>
              </div>
              <div style={{ marginTop: "16px", fontSize: "12px", color: "#a8a29e" }}>
                © {new Date().getFullYear()} BIGF Kenya. All rights reserved.
              </div>
              <div style={{ marginTop: "8px", display: "flex", gap: "16px", justifyContent: "center" }}>
                <a href="#" style={{ color: "#a8a29e", fontSize: "20px", textDecoration: "none" }}>📱</a>
                <a href="#" style={{ color: "#a8a29e", fontSize: "20px", textDecoration: "none" }}>🐦</a>
                <a href="#" style={{ color: "#a8a29e", fontSize: "20px", textDecoration: "none" }}>📷</a>
              </div>
            </section>
          </div>
        )}

        {/* CHALLENGE VIEW */}
        {activeNavTab === "challenge" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "800px", margin: "0 auto" }}>
            {!selectedHubChallenge ? (
              <>
                <section style={{ background: "linear-gradient(135deg,#17120f 0%,#43180c 55%,#c2410c 100%)", padding: "30px 26px", borderRadius: "28px", color: "#fff", overflow: "hidden", position: "relative", boxShadow: "0 18px 45px rgba(124,45,18,.18)" }}>
                  <div style={{ position: "absolute", right: "-40px", top: "-55px", width: "170px", height: "170px", borderRadius: "50%", background: "rgba(249,115,22,.22)" }} />
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <span style={{ display: "inline-block", background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.18)", padding: "6px 11px", borderRadius: "999px", fontSize: "10px", fontWeight: "1000", letterSpacing: "1.3px" }}>
                      🔥 BIGF CREATOR CHALLENGES
                    </span>
                    <h2 style={{ margin: "12px 0 7px", fontSize: "clamp(28px,5vw,42px)", fontWeight: "1000", lineHeight: "1.05" }}>
                      CREATE. POST. <span style={{ color: "#fdba74" }}>WIN.</span>
                    </h2>
                    <p style={{ margin: 0, maxWidth: "610px", fontSize: "13px", lineHeight: "1.65", color: "#ffedd5", fontWeight: "700" }}>
                      Take a BIGF challenge, publish your noodle video on TikTok, submit the link here, and let TikTok Likes determine the winner!
                    </p>
                    <div style={{ display: "flex", gap: "9px", flexWrap: "wrap", marginTop: "18px" }}>
                      <span style={{ background: "#f97316", padding: "7px 11px", borderRadius: "9px", fontSize: "10px", fontWeight: "1000" }}>🎥 VIDEO</span>
                      <span style={{ background: "rgba(255,255,255,.12)", padding: "7px 11px", borderRadius: "9px", fontSize: "10px", fontWeight: "1000" }}>🎵 TIKTOK</span>
                      <span style={{ background: "rgba(255,255,255,.12)", padding: "7px 11px", borderRadius: "9px", fontSize: "10px", fontWeight: "1000" }}>⭐ TIKTOK LIKES</span>
                    </div>
                  </div>
                </section>

                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {filteredChallenges.map(chal => {
                    const chalEntriesCount = challengeSubmissions.filter(v => v.challengeId === chal.id).length;
                    return (
                      <div key={chal.id} style={{ background: appSettings.darkMode ? "#1e1b18" : "#ffffff", border: "2px solid #fed7aa", borderRadius: "24px", padding: "24px", display: "flex", flexDirection: "column", gap: "14px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                          <span style={{ background: appSettings.darkMode ? "#2a2421" : "#fff7ed", color: "#c2410c", border: "1px solid #fed7aa", padding: "6px 12px", borderRadius: "10px", fontSize: "11px", fontWeight: "1000" }}>
                            🏆 {chal.prize}
                          </span>
                          <span style={{ fontSize: "11px", color: "#a8a29e", fontWeight: "800" }}>⏳ {chal.daysLeft} days remaining • 🎥 {chalEntriesCount} Entries</span>
                        </div>

                        <h3 style={{ fontSize: "20px", fontWeight: "1000", color: appSettings.darkMode ? "#fff" : "#17120f", margin: 0 }}>{chal.title}</h3>
                        <p style={{ fontSize: "13px", color: appSettings.darkMode ? "#d6d3d1" : "#334155", lineHeight: "1.5", margin: 0, fontWeight: "700" }}>{chal.description}</p>
                        
                        <button onClick={() => setSelectedHubChallenge(chal)} style={{ alignSelf: "flex-start", background: "#f97316", color: "#fff", border: "none", padding: "12px 20px", borderRadius: "14px", fontWeight: "1000", fontSize: "13px", cursor: "pointer" }}>
                          🔥 VIEW CHALLENGE & JOIN
                        </button>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <button onClick={() => setSelectedHubChallenge(null)} style={{ alignSelf: "flex-start", background: appSettings.darkMode ? "#2a2421" : "#fff7ed", color: "#c2410c", border: "1px solid #fed7aa", padding: "8px 16px", borderRadius: "12px", fontWeight: "1000", fontSize: "12px", cursor: "pointer" }}>
                  ← Back to All Challenges
                </button>

                <div style={{ background: appSettings.darkMode ? "#1e1b18" : "#ffffff", border: "2px solid #fed7aa", borderRadius: "24px", padding: "24px" }}>
                  <h2 style={{ fontSize: "24px", fontWeight: "1000", color: appSettings.darkMode ? "#fff" : "#17120f", margin: "10px 0 8px 0" }}>{selectedHubChallenge.title}</h2>
                  <p style={{ fontSize: "13px", color: appSettings.darkMode ? "#d6d3d1" : "#334155", lineHeight: "1.5", margin: "0 0 16px 0", fontWeight: "700" }}>{selectedHubChallenge.description}</p>

                  <div style={{ background: appSettings.darkMode ? "#2a2421" : "#fff7ed", border: "1px solid #fed7aa", borderRadius: "18px", padding: "16px", marginTop: "16px" }}>
                    <div style={{ fontSize: "12px", fontWeight: "1000", color: "#c2410c" }}>🔥 HOW TO JOIN</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: "10px", marginTop: "10px" }}>
                      <div style={{ fontSize: "11px", fontWeight: "800" }}>1️⃣ Verify your Email</div>
                      <div style={{ fontSize: "11px", fontWeight: "800" }}>2️⃣ Cook with BIGF</div>
                      <div style={{ fontSize: "11px", fontWeight: "800" }}>3️⃣ Post on TikTok</div>
                      <div style={{ fontSize: "11px", fontWeight: "800" }}>4️⃣ Submit entry + Product Proof</div>
                    </div>

                    {/* Email Verification Section */}
                    <div style={{ marginTop: "16px", background: appSettings.darkMode ? "#1e1b18" : "#ffffff", padding: "16px", borderRadius: "12px", border: "1px solid #fed7aa" }}>
                      <div style={{ fontSize: "13px", fontWeight: "700", color: appSettings.darkMode ? "#fff" : "#17120f", marginBottom: "8px" }}>
                        📧 Verify Your Email to Join
                      </div>
                      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                        <input
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #fed7aa", backgroundColor: appSettings.darkMode ? "#141210" : "#fff", color: appSettings.darkMode ? "#fff" : "#000", fontSize: "12px", minWidth: "180px" }}
                        />
                        <input
                          type="text"
                          placeholder="Display Name"
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #fed7aa", backgroundColor: appSettings.darkMode ? "#141210" : "#fff", color: appSettings.darkMode ? "#fff" : "#000", fontSize: "12px", minWidth: "150px" }}
                        />
                        <button 
                          onClick={handleSendVerificationCode} 
                          style={{ background: "#f97316", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "8px", fontWeight: "700", fontSize: "12px", cursor: "pointer" }}
                        >
                          Send Code
                        </button>
                      </div>
                      {showVerification && (
                        <div style={{ display: "flex", gap: "8px", marginTop: "10px", flexWrap: "wrap" }}>
                          <input
                            type="text"
                            placeholder="Enter 6-digit code"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #fed7aa", backgroundColor: appSettings.darkMode ? "#141210" : "#fff", color: appSettings.darkMode ? "#fff" : "#000", fontSize: "12px" }}
                          />
                          <button onClick={handleVerifyEmail} style={{ background: "#10b981", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "8px", fontWeight: "700", fontSize: "12px", cursor: "pointer" }}>
                            Verify Email
                          </button>
                        </div>
                      )}
                      {isEmailVerified && (
                        <div style={{ marginTop: "10px", padding: "8px 12px", background: "#d1fae5", borderRadius: "8px", color: "#065f46", fontWeight: "700", fontSize: "12px" }}>
                          ✅ Email verified! You can now submit your entry.
                        </div>
                      )}
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      if (!isEmailVerified) {
                        alert("Please verify your email first to submit an entry.");
                        return;
                      }
                      setTargetChallengeForUpload(selectedHubChallenge);
                      setChallengeActionType("social");
                      setExternalSocialUrl("");
                      setSocialCaption("");
                      setProductProofImage(null);
                      setProductProofPreview(null);
                      setShowChallengeActionModal(true);
                    }} 
                    style={{ marginTop: "16px", background: isEmailVerified ? "#f97316" : "#9ca3af", color: "#fff", border: "none", padding: "14px 24px", borderRadius: "14px", fontWeight: "1000", fontSize: "14px", cursor: isEmailVerified ? "pointer" : "not-allowed", width: "100%" }}
                    disabled={!isEmailVerified}
                  >
                    🎵 SUBMIT YOUR ENTRY
                  </button>
                </div>

                {/* Featured Entries */}
                <div>
                  <h3 style={{ fontSize: "18px", fontWeight: "1000", color: appSettings.darkMode ? "#fff" : "#17120f", marginBottom: "16px" }}>
                    ⭐ Featured Entries
                  </h3>
                  {challengeSubmissions.filter(v => v.challengeId === selectedHubChallenge.id && v.isFeatured).length > 0 ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                      {challengeSubmissions.filter(v => v.challengeId === selectedHubChallenge.id && v.isFeatured).map(post => (
                        <div key={post.id} style={{ background: appSettings.darkMode ? "#1e1b18" : "#ffffff", border: "1px solid #fed7aa", borderRadius: "24px", overflow: "hidden" }}>
                          <div style={{ padding: "14px 18px", borderBottom: "1px solid rgba(249,115,22,0.15)" }}>
                            <span style={{ fontSize: "12px", fontWeight: "1000", color: appSettings.darkMode ? "#fff" : "#17120f" }}>{post.pioneer}</span>
                          </div>
                          <div style={{ position: "relative", width: "100%", height: "360px", backgroundColor: "#000" }}>
                            <img src={post.thumbnail} alt="Featured entry" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          </div>
                          <div style={{ padding: "14px 18px" }}>
                            <p style={{ margin: 0, fontSize: "13px", color: appSettings.darkMode ? "#f5f5f4" : "#17120f", fontWeight: "700" }}>{post.caption}</p>
                            {post.tiktokUrl && (
                              <a href={post.tiktokUrl} target="_blank" rel="noreferrer" style={{ display: "inline-flex", marginTop: "10px", background: "#17120f", color: "#fff", padding: "8px 12px", borderRadius: "10px", textDecoration: "none", fontSize: "11px", fontWeight: "1000" }}>
                                🎵 View on TikTok →
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ textAlign: "center", padding: "30px", background: appSettings.darkMode ? "#141210" : "#fff7ed", borderRadius: "16px" }}>
                      <div style={{ fontSize: "40px", marginBottom: "8px" }}>⭐</div>
                      <div style={{ fontSize: "13px", color: "#a8a29e", fontWeight: "700" }}>
                        No featured entries yet. 
                        <br />Be the first to get featured!
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* FEATURED ENTRIES VIEW */}
        {activeNavTab === "featured" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "560px", margin: "0 auto" }}>
            <div style={{ background: appSettings.darkMode ? "#1e1b18" : "#ffffff", padding: "20px 24px", borderRadius: "24px", border: "1px solid #fed7aa" }}>
              <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "1000", color: appSettings.darkMode ? "#fff" : "#17120f" }}>⭐ Featured Creations</h2>
              <p style={{ margin: "2px 0 0 0", fontSize: "12px", color: "#a8a29e", fontWeight: "700" }}>
                Curated BIGF Challenge entries from our community.
              </p>
            </div>

            {challengeSubmissions.filter(s => s.isFeatured).length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {challengeSubmissions.filter(s => s.isFeatured).map(post => (
                  <div key={post.id} style={{ background: appSettings.darkMode ? "#1e1b18" : "#ffffff", border: "1px solid #fed7aa", borderRadius: "28px", overflow: "hidden" }}>
                    <div style={{ padding: "14px 18px", borderBottom: "1px solid rgba(249,115,22,0.15)" }}>
                      <div style={{ fontSize: "13px", fontWeight: "1000", color: appSettings.darkMode ? "#fff" : "#17120f" }}>{post.pioneer}</div>
                      <span style={{ fontSize: "11px", color: "#a8a29e", fontWeight: "800" }}>{post.handle}</span>
                    </div>

                    <div style={{ position: "relative", width: "100%", height: "400px", backgroundColor: "#000" }}>
                      <img src={post.thumbnail} alt="Featured" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>

                    <div style={{ padding: "16px 20px" }}>
                      <p style={{ margin: 0, fontSize: "14px", color: appSettings.darkMode ? "#f5f5f4" : "#17120f", fontWeight: "700" }}>{post.caption}</p>
                      {post.tiktokUrl && (
                        <a href={post.tiktokUrl} target="_blank" rel="noreferrer" style={{ display: "inline-flex", marginTop: "12px", background: "#17120f", color: "#fff", padding: "10px 16px", borderRadius: "10px", textDecoration: "none", fontSize: "12px", fontWeight: "1000" }}>
                          🎵 View on TikTok
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "60px 20px", background: appSettings.darkMode ? "#141210" : "#fff7ed", borderRadius: "24px" }}>
                <div style={{ fontSize: "48px", marginBottom: "12px" }}>⭐</div>
                <div style={{ fontSize: "16px", fontWeight: "1000", color: appSettings.darkMode ? "#fff" : "#17120f" }}>
                  No Featured Entries Yet
                </div>
                <div style={{ fontSize: "13px", color: "#a8a29e", marginTop: "8px" }}>
                  Check back soon for curated BIGF creations!
                </div>
              </div>
            )}
          </div>
        )}

        {/* PROFILE VIEW - My BIGF */}
        {activeNavTab === "profile" && (
          <div style={{ 
            background: appSettings.darkMode ? "#1e1b18" : "#ffffff", 
            border: "1px solid rgba(249,115,22,0.25)", 
            borderRadius: "28px", 
            maxWidth: "700px", 
            margin: "0 auto", 
            overflow: "hidden", 
            boxShadow: "0 10px 30px rgba(0,0,0,0.06)" 
          }}>
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center", 
              padding: "16px 24px", 
              borderBottom: "1px solid rgba(249,115,22,0.15)" 
            }}>
              <span style={{ 
                fontSize: "15px", 
                fontWeight: "1000", 
                color: appSettings.darkMode ? "#fff" : "#17120f" 
              }}>
                👤 My BIGF
              </span>
              {currentUser && (
                <div style={{ display: "flex", gap: "10px" }}>
                  <button 
                    onClick={handleLogout} 
                    style={{ 
                      background: "#ef4444", 
                      color: "#fff", 
                      border: "none", 
                      padding: "6px 14px", 
                      borderRadius: "8px", 
                      fontWeight: "700", 
                      fontSize: "11px", 
                      cursor: "pointer" 
                    }}
                  >
                    Logout
                  </button>
                  <button 
                    onClick={() => setShowEditProfileModal(true)} 
                    style={{ 
                      background: "#f97316", 
                      color: "#fff", 
                      border: "none", 
                      padding: "8px 16px", 
                      borderRadius: "10px", 
                      fontWeight: "1000", 
                      fontSize: "12px", 
                      cursor: "pointer" 
                    }}
                  >
                    ✏️ Edit Profile
                  </button>
                </div>
              )}
              {!currentUser && (
                <button 
                  onClick={() => {
                    setAuthMode("login");
                    setShowAuthModal(true);
                  }} 
                  style={{ 
                    background: "#f97316", 
                    color: "#fff", 
                    border: "none", 
                    padding: "8px 16px", 
                    borderRadius: "10px", 
                    fontWeight: "1000", 
                    fontSize: "12px", 
                    cursor: "pointer" 
                  }}
                >
                  🔐 Sign Up / Login
                </button>
              )}
            </div>

            {currentUser ? (
              // LOGGED IN - Show full profile
              <>
                <div style={{ padding: "24px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                  <div style={{ position: "relative", marginBottom: "16px" }}>
                    <img 
                      src={currentUser?.avatar || "https://i.pravatar.cc/150?img=1"} 
                      alt={currentUser?.name || "User"} 
                      style={{ 
                        width: "120px", 
                        height: "120px", 
                        borderRadius: "50%", 
                        objectFit: "cover", 
                        border: "4px solid #f97316",
                        boxShadow: "0 4px 20px rgba(249,115,22,0.3)"
                      }} 
                    />
                    <button
                      onClick={() => document.getElementById("avatarUploadDirect").click()}
                      style={{
                        position: "absolute",
                        bottom: "4px",
                        right: "4px",
                        background: "#f97316",
                        color: "#fff",
                        border: "3px solid #fff",
                        borderRadius: "50%",
                        width: "36px",
                        height: "36px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "16px",
                        fontWeight: "bold",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.2)"
                      }}
                      title="Change profile picture"
                    >
                      📷
                    </button>
                    <input
                      id="avatarUploadDirect"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            const updatedUser = {
                              ...currentUser,
                              avatar: reader.result
                            };
                            setCurrentUser(updatedUser);
                            setUserProfile(updatedUser);
                            localStorage.setItem("currentUser", JSON.stringify(updatedUser));
                            localStorage.setItem("bigf_user_profile", JSON.stringify(updatedUser));
                            
                            const allUsersData = JSON.parse(localStorage.getItem("allUsersData") || "{}");
                            if (allUsersData[currentUser?.username]) {
                              allUsersData[currentUser.username] = updatedUser;
                              localStorage.setItem("allUsersData", JSON.stringify(allUsersData));
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </div>

                  <h2 style={{ margin: "0 0 4px 0", fontSize: "22px", fontWeight: "1000", color: appSettings.darkMode ? "#fff" : "#17120f" }}>
                    {currentUser?.name || "Participant"}
                  </h2>
                  <p style={{ fontSize: "14px", color: "#a8a29e", margin: "0 0 8px 0", fontWeight: "700" }}>
                    {currentUser?.handle || ""}
                  </p>
                  <p style={{ fontSize: "12px", color: "#a8a29e", marginBottom: "12px" }}>
                    👤 @{currentUser?.username || ""}
                  </p>
                  <p style={{ fontSize: "13px", color: appSettings.darkMode ? "#d6d3d1" : "#44403c", margin: "0 0 16px 0", fontWeight: "600", maxWidth: "500px", lineHeight: "1.6" }}>
                    {currentUser?.bio || "BIGF Challenge Participant"}
                  </p>

                  <div style={{ 
                    display: "grid", 
                    gridTemplateColumns: "repeat(2, 1fr)", 
                    gap: "12px", 
                    width: "100%", 
                    maxWidth: "400px",
                    marginTop: "8px"
                  }}>
                    <div style={{ 
                      background: appSettings.darkMode ? "#141210" : "#fff7ed", 
                      padding: "12px", 
                      borderRadius: "12px", 
                      border: "1px solid #fed7aa",
                      textAlign: "center"
                    }}>
                      <div style={{ fontSize: "18px", fontWeight: "1000", color: "#c2410c" }}>
                        {currentUser?.submissions?.length || 0}
                      </div>
                      <div style={{ fontSize: "10px", color: "#a8a29e", fontWeight: "800", textTransform: "uppercase" }}>
                        Submissions
                      </div>
                    </div>
                    <div style={{ 
                      background: appSettings.darkMode ? "#141210" : "#fff7ed", 
                      padding: "12px", 
                      borderRadius: "12px", 
                      border: "1px solid #fed7aa",
                      textAlign: "center"
                    }}>
                      <div style={{ fontSize: "18px", fontWeight: "1000", color: "#c2410c" }}>
                        {currentUser?.submissions?.filter(s => s.status === "APPROVED").length || 0}
                      </div>
                      <div style={{ fontSize: "10px", color: "#a8a29e", fontWeight: "800", textTransform: "uppercase" }}>
                        Approved
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ 
                  display: "flex", 
                  borderTop: "1px solid rgba(249,115,22,0.15)", 
                  borderBottom: "1px solid rgba(249,115,22,0.15)" 
                }}>
                  <button 
                    onClick={() => setProfileTab("overview")} 
                    style={{ 
                      flex: 1, 
                      padding: "14px 8px", 
                      background: "none", 
                      border: "none", 
                      borderBottom: profileTab === "overview" ? "3px solid #f97316" : "3px solid transparent", 
                      fontWeight: "1000", 
                      fontSize: "12px", 
                      color: profileTab === "overview" ? "#f97316" : "#a8a29e", 
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                  >
                    📊 Overview
                  </button>
                  <button 
                    onClick={() => setProfileTab("submissions")} 
                    style={{ 
                      flex: 1, 
                      padding: "14px 8px", 
                      background: "none", 
                      border: "none", 
                      borderBottom: profileTab === "submissions" ? "3px solid #f97316" : "3px solid transparent", 
                      fontWeight: "1000", 
                      fontSize: "12px", 
                      color: profileTab === "submissions" ? "#f97316" : "#a8a29e", 
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                  >
                    📹 Submissions
                  </button>
                </div>

                <div style={{ padding: "20px", minHeight: "250px", background: appSettings.darkMode ? "#141210" : "#fafaf9" }}>
                  {profileTab === "overview" && (
                    <div>
                      <h4 style={{ margin: "0 0 16px 0", fontSize: "15px", fontWeight: "1000", color: appSettings.darkMode ? "#fff" : "#17120f" }}>
                        📊 Account Overview
                      </h4>
                      
                      <div style={{ 
                        display: "grid", 
                        gridTemplateColumns: "1fr 1fr", 
                        gap: "12px",
                        marginBottom: "16px"
                      }}>
                        <div style={{ 
                          background: appSettings.darkMode ? "#1e1b18" : "#ffffff", 
                          padding: "16px", 
                          borderRadius: "12px", 
                          border: "1px solid #fed7aa" 
                        }}>
                          <div style={{ fontSize: "11px", color: "#a8a29e", fontWeight: "800", textTransform: "uppercase" }}>Account Created</div>
                          <div style={{ fontSize: "13px", fontWeight: "700", color: appSettings.darkMode ? "#fff" : "#17120f", marginTop: "4px" }}>
                            {currentUser?.createdAt ? new Date(currentUser.createdAt).toLocaleDateString() : "Today"}
                          </div>
                        </div>
                        <div style={{ 
                          background: appSettings.darkMode ? "#1e1b18" : "#ffffff", 
                          padding: "16px", 
                          borderRadius: "12px", 
                          border: "1px solid #fed7aa" 
                        }}>
                          <div style={{ fontSize: "11px", color: "#a8a29e", fontWeight: "800", textTransform: "uppercase" }}>Username</div>
                          <div style={{ fontSize: "12px", fontWeight: "700", color: appSettings.darkMode ? "#fff" : "#17120f", marginTop: "4px", wordBreak: "break-all" }}>
                            @{currentUser?.username || "Not set"}
                          </div>
                        </div>
                      </div>

                      <div style={{ 
                        background: appSettings.darkMode ? "#1e1b18" : "#ffffff", 
                        padding: "16px", 
                        borderRadius: "12px", 
                        border: "1px solid #fed7aa" 
                      }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div>
                            <div style={{ fontSize: "11px", color: "#a8a29e", fontWeight: "800", textTransform: "uppercase" }}>Account Status</div>
                            <div style={{ fontSize: "13px", fontWeight: "700", color: "#10b981", marginTop: "4px" }}>
                              ✅ Active
                            </div>
                          </div>
                          <div style={{ textAlign: "right" }}>
                            <div style={{ fontSize: "11px", color: "#a8a29e", fontWeight: "800", textTransform: "uppercase" }}>Total Activity</div>
                            <div style={{ fontSize: "13px", fontWeight: "700", color: appSettings.darkMode ? "#fff" : "#17120f", marginTop: "4px" }}>
                              {currentUser?.submissions?.length || 0} submissions
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {profileTab === "submissions" && (
                    <div>
                      {currentUser?.submissions?.length > 0 ? (
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "12px" }}>
                          {currentUser.submissions.map((submission, index) => (
                            <div key={submission.id || index} style={{ 
                              background: appSettings.darkMode ? "#1e1b18" : "#ffffff", 
                              border: "1px solid #fed7aa", 
                              borderRadius: "14px", 
                              overflow: "hidden" 
                            }}>
                              {submission.thumbnail && (
                                <img src={submission.thumbnail} alt="Submission" style={{ width: "100%", height: "140px", objectFit: "cover" }} />
                              )}
                              <div style={{ padding: "10px" }}>
                                <div style={{ fontSize: "11px", fontWeight: "900", color: appSettings.darkMode ? "#fff" : "#17120f" }}>
                                  {submission.challengeTitle || "BIGF Submission"}
                                </div>
                                <div style={{ fontSize: "10px", color: submission.status === "APPROVED" ? "#10b981" : submission.status === "REJECTED" ? "#ef4444" : "#f59e0b", marginTop: "4px", fontWeight: "800" }}>
                                  Status: {submission.status || "PENDING_REVIEW"}
                                </div>
                                {submission.isFeatured && (
                                  <div style={{ fontSize: "10px", color: "#f59e0b", fontWeight: "800" }}>
                                    ⭐ Featured
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div style={{ textAlign: "center", padding: "40px 20px" }}>
                          <div style={{ fontSize: "40px", marginBottom: "10px" }}>📹</div>
                          <div style={{ fontSize: "15px", fontWeight: "1000", color: appSettings.darkMode ? "#fff" : "#17120f", marginBottom: "5px" }}>
                            No submissions yet
                          </div>
                          <div style={{ fontSize: "12px", color: "#a8a29e" }}>
                            Join a BIGF challenge and submit your entry!
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </>
            ) : (
              // LOGGED OUT - Show signup/login message
              <div style={{ padding: "60px 20px", textAlign: "center" }}>
                <div style={{ fontSize: "48px", marginBottom: "12px" }}>👋</div>
                <h3 style={{ fontSize: "18px", fontWeight: "1000", color: appSettings.darkMode ? "#fff" : "#17120f" }}>
                  Welcome to My BIGF
                </h3>
                <p style={{ fontSize: "14px", color: "#a8a29e", marginBottom: "20px" }}>
                  Create an account to track your submissions and rewards.
                </p>
                <button 
                  onClick={() => {
                    setAuthMode("login");
                    setShowAuthModal(true);
                  }} 
                  style={{ 
                    background: "#f97316", 
                    color: "#fff", 
                    border: "none", 
                    padding: "14px 28px", 
                    borderRadius: "12px", 
                    fontWeight: "1000", 
                    fontSize: "14px", 
                    cursor: "pointer" 
                  }}
                >
                  🔐 Sign Up / Login
                </button>
                <p style={{ fontSize: "12px", color: "#a8a29e", marginTop: "12px" }}>
                  You can submit a challenge entry without an account - just verify your email.
                </p>
              </div>
            )}
          </div>
        )}

        {/* EDIT PROFILE MODAL */}
        {showEditProfileModal && (
          <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", zIndex: 400 }}>
            <div style={{ background: appSettings.darkMode ? "#1e1b18" : "#ffffff", color: appSettings.darkMode ? "#fff" : "#17120f", borderRadius: "28px", maxWidth: "440px", width: "100%", padding: "28px", border: "2px solid #fed7aa" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <span style={{ fontSize: "14px", fontWeight: "1000", color: "#c2410c", textTransform: "uppercase" }}>✏️ Edit Profile</span>
                <button onClick={() => setShowEditProfileModal(false)} style={{ background: "none", border: "none", fontSize: "16px", cursor: "pointer", fontWeight: "bold", color: appSettings.darkMode ? "#fff" : "#000" }}>✕</button>
              </div>

              <form onSubmit={handleSaveEditProfile} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "8px" }}>
                  <img 
                    src={editAvatar || "https://i.pravatar.cc/150?img=1"} 
                    alt="Profile" 
                    style={{ width: "64px", height: "64px", borderRadius: "50%", objectFit: "cover", border: "2px solid #f97316" }} 
                  />
                  <div>
                    <label style={{ fontSize: "11px", fontWeight: "1000", color: "#a8a29e", display: "block", marginBottom: "4px" }}>
                      Choose from Gallery
                    </label>
                    <button
                      type="button"
                      onClick={() => document.getElementById("avatarUploadModal").click()}
                      style={{
                        background: "#f97316",
                        color: "#fff",
                        border: "none",
                        padding: "6px 14px",
                        borderRadius: "8px",
                        fontWeight: "700",
                        fontSize: "12px",
                        cursor: "pointer"
                      }}
                    >
                      📷 Select Image
                    </button>
                    <input
                      id="avatarUploadModal"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setEditAvatar(reader.result);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </div>
                </div>

                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Display Name"
                  style={{ width: "100%", padding: "10px", borderRadius: "10px", border: "1px solid #fed7aa", backgroundColor: appSettings.darkMode ? "#141210" : "#fff", color: appSettings.darkMode ? "#fff" : "#000", fontSize: "13px", fontWeight: "700", boxSizing: "border-box" }}
                />
                <input
                  type="text"
                  value={editHandle}
                  onChange={(e) => setEditHandle(e.target.value)}
                  placeholder="Handle (e.g., @username)"
                  style={{ width: "100%", padding: "10px", borderRadius: "10px", border: "1px solid #fed7aa", backgroundColor: appSettings.darkMode ? "#141210" : "#fff", color: appSettings.darkMode ? "#fff" : "#000", fontSize: "13px", fontWeight: "700", boxSizing: "border-box" }}
                />
                <textarea
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  placeholder="Bio"
                  rows={3}
                  style={{ width: "100%", padding: "10px", borderRadius: "10px", border: "1px solid #fed7aa", backgroundColor: appSettings.darkMode ? "#141210" : "#fff", color: appSettings.darkMode ? "#fff" : "#000", fontSize: "13px", fontWeight: "700", boxSizing: "border-box", resize: "none" }}
                />
                <div style={{ display: "flex", gap: "10px" }}>
                  <button type="button" onClick={() => setShowEditProfileModal(false)} style={{ flex: 1, background: "transparent", border: "1px solid #fed7aa", padding: "12px", borderRadius: "10px", fontWeight: "700", cursor: "pointer", color: appSettings.darkMode ? "#fff" : "#17120f" }}>
                    Cancel
                  </button>
                  <button type="submit" style={{ flex: 2, background: "#f97316", color: "#fff", border: "none", padding: "12px", borderRadius: "10px", fontWeight: "1000", cursor: "pointer" }}>
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* CHALLENGE ACTION MODAL */}
        {showChallengeActionModal && (
          <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", zIndex: 400 }}>
            <div style={{ background: appSettings.darkMode ? "#1e1b18" : "#ffffff", color: appSettings.darkMode ? "#fff" : "#17120f", borderRadius: "28px", maxWidth: "500px", width: "100%", padding: "28px", border: "2px solid #fed7aa" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <div>
                  <span style={{ fontSize: "11px", fontWeight: "1000", color: "#c2410c", textTransform: "uppercase" }}>🔥 Challenge Entry</span>
                  <h3 style={{ margin: "5px 0 0", fontSize: "20px", fontWeight: "1000" }}>Submit Your Entry</h3>
                </div>
                <button onClick={() => setShowChallengeActionModal(false)} style={{ background: "none", border: "none", fontSize: "16px", cursor: "pointer", fontWeight: "bold", color: appSettings.darkMode ? "#fff" : "#000" }}>✕</button>
              </div>
              
              <div style={{ background: appSettings.darkMode ? "#2a2421" : "#fff7ed", border: "1px solid #fed7aa", borderRadius: "14px", padding: "13px", marginBottom: "14px" }}>
                <div style={{ fontSize: "12px", fontWeight: "1000", color: "#c2410c" }}>📋 Requirements</div>
                <div style={{ fontSize: "11px", color: "#a8a29e", fontWeight: "700", marginTop: "4px" }}>
                  ✅ TikTok video must clearly show identifiable BIGF product/packaging<br />
                  ✅ Upload a clear photo of the BIGF product/package you used<br />
                  ✅ TikTok URL must be public and accessible
                </div>
              </div>
              
              <form onSubmit={handleSocialUrlSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <input 
                  type="url" 
                  placeholder="https://www.tiktok.com/@yourhandle/video/..." 
                  value={externalSocialUrl} 
                  onChange={(e) => setExternalSocialUrl(e.target.value)} 
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid #fed7aa", backgroundColor: appSettings.darkMode ? "#1e1b18" : "#fff", color: appSettings.darkMode ? "#fff" : "#000", fontSize: "13px", fontWeight: "700", boxSizing: "border-box" }} 
                />
                <textarea 
                  placeholder="Tell us what you created..." 
                  value={socialCaption} 
                  onChange={(e) => setSocialCaption(e.target.value)} 
                  rows={3} 
                  style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid #fed7aa", backgroundColor: appSettings.darkMode ? "#141210" : "#fff", color: appSettings.darkMode ? "#fff" : "#000", fontSize: "13px", fontWeight: "700", boxSizing: "border-box", resize: "none" }} 
                />
                
                {/* Product Proof Upload */}
                <div>
                  <label style={{ fontSize: "11px", fontWeight: "1000", color: "#a8a29e", display: "block", marginBottom: "4px" }}>
                    📷 BIGF Product Proof (required)
                  </label>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                    <button
                      type="button"
                      onClick={() => document.getElementById("productProofUpload").click()}
                      style={{
                        background: "#f97316",
                        color: "#fff",
                        border: "none",
                        padding: "8px 16px",
                        borderRadius: "8px",
                        fontWeight: "700",
                        fontSize: "12px",
                        cursor: "pointer"
                      }}
                    >
                      📷 Select Image
                    </button>
                    <input
                      id="productProofUpload"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleProductProofUpload}
                    />
                    {productProofPreview && (
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <img src={productProofPreview} alt="Product Proof" style={{ width: "50px", height: "50px", borderRadius: "8px", objectFit: "cover" }} />
                        <span style={{ fontSize: "11px", color: "#10b981", fontWeight: "700" }}>✅ Uploaded</span>
                      </div>
                    )}
                  </div>
                  <div style={{ fontSize: "10px", color: "#a8a29e", marginTop: "4px" }}>
                    Upload a clear photo of the BIGF product/package you used for this Challenge.
                  </div>
                </div>
                
                <button type="submit" style={{ background: "#f97316", color: "#fff", border: "none", padding: "13px", borderRadius: "12px", fontWeight: "1000", cursor: "pointer" }}>
                  Submit Entry →
                </button>
              </form>
            </div>
          </div>
        )}

        {/* SETTINGS MODAL */}
        {showSettingsModal && (
          <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", zIndex: 400 }}>
            <div style={{ background: appSettings.darkMode ? "#181512" : "#f4f4f5", color: appSettings.darkMode ? "#fff" : "#17120f", borderRadius: "28px", maxWidth: "440px", width: "100%", overflow: "hidden", border: "1px solid rgba(249,115,22,0.3)", boxShadow: "0 25px 50px rgba(0,0,0,0.3)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 22px", background: appSettings.darkMode ? "#221e1a" : "#ffffff", borderBottom: "1px solid rgba(249,115,22,0.15)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "18px" }}>⚙️</span>
                  <span style={{ fontSize: "16px", fontWeight: "1000" }}>Settings & Preferences</span>
                </div>
                <button onClick={() => setShowSettingsModal(false)} style={{ background: appSettings.darkMode ? "#332d28" : "#f1f1f3", border: "none", width: "30px", height: "30px", borderRadius: "50%", fontSize: "14px", cursor: "pointer", fontWeight: "bold", color: appSettings.darkMode ? "#fff" : "#555", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
              </div>

              <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "18px", maxHeight: "75vh", overflowY: "auto" }}>
                <div>
                  <span style={{ fontSize: "11px", fontWeight: "1000", color: "#c2410c", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: "8px", paddingLeft: "6px" }}>Appearance</span>
                  <div style={{ background: appSettings.darkMode ? "#221e1a" : "#ffffff", borderRadius: "18px", overflow: "hidden", border: "1px solid rgba(249,115,22,0.15)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <span style={{ fontSize: "18px" }}>🌙</span>
                        <span style={{ fontSize: "13px", fontWeight: "900" }}>Dark Mode</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={appSettings.darkMode}
                        onChange={(e) => setAppSettings(s => ({ ...s, darkMode: e.target.checked }))}
                        style={{ width: "20px", height: "20px", accentColor: "#f97316", cursor: "pointer" }}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: "11px", fontWeight: "1000", color: "#c2410c", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: "8px", paddingLeft: "6px" }}>Preferences & Feed</span>
                  <div style={{ background: appSettings.darkMode ? "#221e1a" : "#ffffff", borderRadius: "18px", overflow: "hidden", border: "1px solid rgba(249,115,22,0.15)", display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", borderBottom: "1px solid rgba(249,115,22,0.1)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <span style={{ fontSize: "18px" }}>🔔</span>
                        <span style={{ fontSize: "13px", fontWeight: "900" }}>Push Notifications</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={appSettings.pushNotifications}
                        onChange={(e) => setAppSettings(s => ({ ...s, pushNotifications: e.target.checked }))}
                        style={{ width: "20px", height: "20px", accentColor: "#f97316", cursor: "pointer" }}
                      />
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", borderBottom: "1px solid rgba(249,115,22,0.1)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <span style={{ fontSize: "18px" }}>▶️</span>
                        <span style={{ fontSize: "13px", fontWeight: "900" }}>Autoplay Videos</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={appSettings.autoplayVideos}
                        onChange={(e) => setAppSettings(s => ({ ...s, autoplayVideos: e.target.checked }))}
                        style={{ width: "20px", height: "20px", accentColor: "#f97316", cursor: "pointer" }}
                      />
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <span style={{ fontSize: "18px" }}>📶</span>
                        <span style={{ fontSize: "13px", fontWeight: "900" }}>Data Saver Mode</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={appSettings.dataSaver}
                        onChange={(e) => setAppSettings(s => ({ ...s, dataSaver: e.target.checked }))}
                        style={{ width: "20px", height: "20px", accentColor: "#f97316", cursor: "pointer" }}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: "11px", fontWeight: "1000", color: "#c2410c", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: "8px", paddingLeft: "6px" }}>Account & Privacy</span>
                  <div style={{ background: appSettings.darkMode ? "#221e1a" : "#ffffff", borderRadius: "18px", overflow: "hidden", border: "1px solid rgba(249,115,22,0.15)", display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", borderBottom: "1px solid rgba(249,115,22,0.1)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <span style={{ fontSize: "18px" }}>🔒</span>
                        <span style={{ fontSize: "13px", fontWeight: "900" }}>Private Account</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={appSettings.privateAccount}
                        onChange={(e) => setAppSettings(s => ({ ...s, privateAccount: e.target.checked }))}
                        style={{ width: "20px", height: "20px", accentColor: "#f97316", cursor: "pointer" }}
                      />
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <span style={{ fontSize: "18px" }}>🛡️</span>
                        <span style={{ fontSize: "13px", fontWeight: "900" }}>Restricted Mode</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={appSettings.restrictedMode}
                        onChange={(e) => setAppSettings(s => ({ ...s, restrictedMode: e.target.checked }))}
                        style={{ width: "20px", height: "20px", accentColor: "#f97316", cursor: "pointer" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ padding: "16px 20px", background: appSettings.darkMode ? "#221e1a" : "#ffffff", borderTop: "1px solid rgba(249,115,22,0.15)" }}>
                <button onClick={() => setShowSettingsModal(false)} style={{ background: "linear-gradient(135deg, #f97316 0%, #c2410c 100%)", color: "#fff", border: "none", padding: "12px", borderRadius: "14px", fontWeight: "1000", fontSize: "13px", width: "100%", cursor: "pointer", boxShadow: "0 4px 12px rgba(249,115,22,0.3)" }}>
                  Save & Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* BOTTOM NAVIGATION BAR */}
        <nav style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: appSettings.darkMode ? "#1e1b18" : "rgba(255,255,255,.98)", backdropFilter: "blur(25px)", borderTop: "1px solid rgba(249,115,22,.25)", display: "flex", justifyContent: "space-around", alignItems: "center", padding: "10px 0", zIndex: 99999, pointerEvents: "auto" }}>
          <button onClick={() => { setSelectedHubChallenge(null); setActiveNavTab("home"); }} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", color: activeNavTab==="home" ? "#c2410c" : "#a8a29e", fontWeight: "1000", fontSize: "12px", pointerEvents: "auto" }}>
            🏠 Home
          </button>
          <button onClick={() => { setSelectedHubChallenge(null); setActiveNavTab("challenge"); }} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", color: activeNavTab==="challenge" ? "#c2410c" : "#a8a29e", fontWeight: "1000", fontSize: "12px", pointerEvents: "auto" }}>
            🏆 Challenge
          </button>
          <button onClick={() => { setSelectedHubChallenge(null); setActiveNavTab("featured"); }} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", color: activeNavTab==="featured" ? "#c2410c" : "#a8a29e", fontWeight: "1000", fontSize: "12px", pointerEvents: "auto" }}>
            ⭐ Featured
          </button>
          {isAdmin && (
            <button onClick={() => { setSelectedHubChallenge(null); setActiveNavTab("admin"); }} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", color: activeNavTab==="admin" ? "#dc2626" : "#a8a29e", fontWeight: "1000", fontSize: "12px", pointerEvents: "auto" }}>
              🛠️ Admin
            </button>
          )}
          <button onClick={() => { setSelectedHubChallenge(null); setActiveNavTab("profile"); }} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", color: activeNavTab==="profile" ? "#c2410c" : "#a8a29e", fontWeight: "1000", fontSize: "12px", pointerEvents: "auto" }}>
            {currentUser ? (
              <img src={currentUser.avatar} alt="avatar" style={{ width: "28px", height: "28px", borderRadius: "50%", objectFit: "cover", border: "2px solid #f97316" }} />
            ) : (
              "👤"
            )}
            <span style={{ fontSize: "9px", marginTop: "2px" }}>My BIGF</span>
          </button>
        </nav>
      </main>
    </div>
  );
}