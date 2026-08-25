import React, { useState, useEffect, useRef } from "react";
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

const INITIAL_FEED_VIDEOS = [
  {
    id: "feed-1",
    pioneer: "Amina Otieno",
    handle: "@amina_otieno",
    thumbnail: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
    caption: "Just made the ultimate BIGF Chicken Noodles with boiled eggs and fresh green onions! 🔥🍜",
    likes: 42,
    reposts: 12,
    likedByMe: false,
    repostedByMe: false,
    isFollowing: false,
    comments: [
      {
        id: "cm-1",
        user: "@kiprop_cooks",
        text: "Looks amazing! Did you add extra chili oil?",
        likes: 5,
        likedByMe: false,
        replies: [
          {
            id: "rep-1",
            user: "@amina_otieno",
            text: "Yes! A generous dash of Sichuan chili oil makes all the difference 🌶️",
            likes: 2,
            likedByMe: false
          }
        ]
      }
    ]
  },
  {
    id: "feed-2",
    pioneer: "Kiprop Cooks",
    handle: "@kiprop_cooks",
    thumbnail: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=600&q=80",
    caption: "BIGF Sweet Chili noodles with green bell peppers and crispy garlic. Quick, simple and seriously good! 🌶️✨",
    likes: 38,
    reposts: 9,
    likedByMe: false,
    repostedByMe: false,
    isFollowing: false,
    comments: []
  },
  {
    id: "feed-3",
    pioneer: "Wanjiru E",
    handle: "@wanjiru_E",
    thumbnail: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=600&q=80",
    caption: "Midnight BIGF Beef noodles with extra chili oil! 🍜😋 What is your favorite BIGF combo?",
    likes: 64,
    reposts: 15,
    likedByMe: false,
    repostedByMe: false,
    isFollowing: false,
    comments: []
  }
];

const INITIAL_CHALLENGE_SUBMISSIONS = [
  {
    id: "submission-1",
    challengeId: "c1",
    challengeTitle: "BIGF Season 1 Noodle Rumble Challenge",
    pioneer: "Amina Otieno",
    handle: "@amina_otieno",
    thumbnail: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
    caption: "My BIGF Noodle Rumble entry with boiled eggs and fresh green onions! 🔥 #NoodleRumble",
    tiktokUrl: "https://www.tiktok.com/",
    votes: 42,
    votedByMe: false,
    isFollowing: false
  },
  {
    id: "submission-2",
    challengeId: "c2",
    challengeTitle: "5-Minute Speedy Chef Challenge",
    pioneer: "Kiprop Cooks",
    handle: "@kiprop_cooks",
    thumbnail: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=600&q=80",
    caption: "Sweet Chili noodles with green bell peppers and crispy garlic in under 5 minutes! 🌶️✨ #SpeedyChef",
    tiktokUrl: "https://www.tiktok.com/",
    votes: 38,
    votedByMe: false,
    isFollowing: false
  },
  {
    id: "submission-3",
    challengeId: "c3",
    challengeTitle: "Midnight Cravings Special Mix",
    pioneer: "Wanjiru E",
    handle: "@wanjiru_E",
    thumbnail: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=600&q=80",
    caption: "My BIGF Beef Midnight Cravings entry with extra chili oil! 🍜 #MidnightCravings",
    tiktokUrl: "https://www.tiktok.com/",
    votes: 64,
    votedByMe: false,
    isFollowing: false
  }
];

const INITIAL_CHALLENGES = [
  {
    id: "c1",
    title: "BIGF Season 1 Noodle Rumble Challenge",
    organizer: "@BIGFKenya",
    daysLeft: 14,
    prize: "KSh 15,000 Cash + BIGF Mega Supply",
    tag: "#NoodleRumble",
    category: "Main",
    description: "Cook your favorite BIGF noodles with your own twist, post your entry on TikTok, then submit the TikTok video link here for review and voting.",
    rules: [
      "1. Create your BIGF challenge video and publish it on TikTok.",
      "2. Copy your TikTok video link and submit it here for review.",
      "3. Gather community votes (⭐) on the BIGF Challenge page!"
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
      "3. Get community votes to win!"
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
      "3. Win via community votes!"
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

const getRandomName = () => {
  const names = ["Amina", "Kiprop", "Wanjiru", "James", "Grace", "David", "Sarah", "Kevin", "Faith", "Peter", "Mary", "John", "Esther", "Samuel", "Ruth", "Daniel", "Mercy", "Joseph", "Joy", "Michael"];
  return names[Math.floor(Math.random() * names.length)];
};

export default function App() {
  const [activeNavTab, setActiveNavTab] = useState("home");
  const [feedVideos, setFeedVideos] = useState(INITIAL_FEED_VIDEOS);
  const [challengeSubmissions, setChallengeSubmissions] = useState(INITIAL_CHALLENGE_SUBMISSIONS);
  const [challenges, setChallenges] = useState(INITIAL_CHALLENGES);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [selectedHubChallenge, setSelectedHubChallenge] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [quizStep, setQuizStep] = useState(1);
  const [quizSpice, setQuizSpice] = useState(null);
  const [quizResult, setQuizResult] = useState(null);

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("currentUser");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.id) {
          return parsed;
        }
      } catch (e) {}
    }
    const firstName = getRandomName();
    const randomNum = Math.floor(100 + Math.random() * 900);
    const handle = "@" + firstName.toLowerCase() + "_" + randomNum;
    return {
      id: "user-" + Date.now(),
      name: firstName,
      handle: handle,
      bio: "BIGF food lover 🍜✨",
      avatar: "https://i.pravatar.cc/150?img=" + Math.floor(1 + Math.random() * 70),
      followers: 0,
      following: 0,
      posts: [],
      reposts: [],
      votedPosts: [],
      submissions: [],
      createdAt: new Date().toISOString()
    };
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      localStorage.setItem("bigf_user_profile", JSON.stringify(currentUser));
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
  const videoFeedRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [orders, setOrders] = useState([
    { id: "ORD-9421", customer: "Amina Otieno", item: "BIGF Chicken Flavor (Pack of 5)", date: "Aug 9, 2026", total: "KSh 250", status: "Delivered", image: INITIAL_PRODUCTS[0].image }
  ]);
  const [newCommentText, setNewCommentText] = useState("");

  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem("bigf_user_profile");
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        if (parsed && parsed.name) {
          return parsed;
        }
      } catch (e) {}
    }
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        if (parsed && parsed.name) {
          return parsed;
        }
      } catch (e) {}
    }
    return {
      name: getRandomName(),
      handle: "@bigf_user",
      bio: "Ready for BIGF Kenya challenges 🍜✨",
      avatar: "https://i.pravatar.cc/150?img=" + Math.floor(1 + Math.random() * 70),
      followers: 0,
      following: 0,
      posts: [],
      reposts: [],
      votedPosts: []
    };
  });

  const [profileTab, setProfileTab] = useState("videos");
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
        "3. Get community votes to win!"
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

    const targetChal = targetChallengeForUpload || challenges[0];
    const newSocialSubmission = {
      id: "submission-" + Date.now(),
      challengeId: targetChal.id,
      challengeTitle: targetChal.title,
      pioneer: currentUser?.name || "BIGF User",
      handle: currentUser?.handle || "@user",
      thumbnail: products[1].image,
      caption: socialCaption,
      tiktokUrl: url,
      votes: 0,
      votedByMe: false,
      isFollowing: false
    };

    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        submissions: [...(currentUser.submissions || []), newSocialSubmission]
      };
      setCurrentUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    }

    setChallengeSubmissions(prev => [newSocialSubmission, ...prev]);
    setExternalSocialUrl("");
    setSocialCaption("");
    setChallengeActionType(null);
    setShowChallengeActionModal(false);
    alert("🎉 Your TikTok entry has been submitted to the challenge!");
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    
    const newPost = {
      id: "post-" + Date.now(),
      caption: newPostCaption,
      videoUrl: newPostMedia ? URL.createObjectURL(newPostMedia) : null,
      user: currentUser?.name || "You",
      avatar: currentUser?.avatar || "👤",
      likes: 0,
      comments: [],
      timestamp: "Just now",
      pioneer: currentUser?.name || "You",
      handle: currentUser?.handle || "@user",
      thumbnail: newPostMedia ? URL.createObjectURL(newPostMedia) : "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
      likedByMe: false,
      repostedByMe: false,
      isFollowing: false
    };

    setFeedVideos(prev => [newPost, ...prev]);
    setNewPostCaption("");
    setNewPostMedia(null);
    setShowFreestyleModal(false);
  };

  const handleFollowUser = (postId) => {
    const updateFollowing = (items) => items.map(v => {
      if (v.id === postId) {
        const nextFollowing = !v.isFollowing;
        if (currentUser) {
          const updatedUser = {
            ...currentUser,
            following: Math.max(0, nextFollowing ? (currentUser.following || 0) + 1 : (currentUser.following || 0) - 1)
          };
          setCurrentUser(updatedUser);
          localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        }
        return { ...v, isFollowing: nextFollowing };
      }
      return v;
    });

    setFeedVideos(prev => updateFollowing(prev));
  };

  const handleVotePost = (postId) => {
    setChallengeSubmissions(prev => prev.map(v => {
      if (v.id === postId) {
        const nextVoted = !v.votedByMe;
        if (currentUser) {
          const updatedVotedPosts = nextVoted
            ? [...(currentUser.votedPosts || []), v]
            : (currentUser.votedPosts || []).filter(item => item.id !== postId);
          const updatedUser = { ...currentUser, votedPosts: updatedVotedPosts };
          setCurrentUser(updatedUser);
          localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        }

        return {
          ...v,
          votedByMe: nextVoted,
          votes: nextVoted ? v.votes + 1 : Math.max(0, v.votes - 1)
        };
      }
      return v;
    }));
  };

  const handleLikeFeedItem = (postId) => {
    setFeedVideos(prev => prev.map(v => {
      if (v.id === postId) {
        const nextLiked = !v.likedByMe;
        return {
          ...v,
          likedByMe: nextLiked,
          likes: nextLiked ? v.likes + 1 : v.likes - 1
        };
      }
      return v;
    }));
  };

  const handleRepost = (postId) => {
    setFeedVideos(prev => prev.map(v => {
      if (v.id === postId) {
        const nextReposted = !v.repostedByMe;
        if (currentUser) {
          const updatedReposts = nextReposted
            ? [...(currentUser.reposts || []), v]
            : (currentUser.reposts || []).filter(item => item.id !== postId);
          const updatedUser = { ...currentUser, reposts: updatedReposts };
          setCurrentUser(updatedUser);
          localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        }

        return {
          ...v,
          repostedByMe: nextReposted,
          reposts: nextReposted ? v.reposts + 1 : v.reposts - 1
        };
      }
      return v;
    }));
  };

  const handleAddComment = (postId, e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment = {
      id: "cm-" + Date.now(),
      user: currentUser?.handle || "@user",
      text: newCommentText.trim(),
      likes: 0,
      likedByMe: false,
      replies: []
    };

    setFeedVideos(prev => prev.map(v => {
      if (v.id === postId) {
        return { ...v, comments: [...v.comments, newComment] };
      }
      return v;
    }));
    setNewCommentText("");
  };

  const handleOrderProduct = (prod) => {
    const newOrd = {
      id: "ORD-" + Math.floor(1000 + Math.random() * 9000),
      customer: currentUser?.name || "BIGF User",
      item: prod.name + " (Pack)",
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      total: prod.price,
      status: "Processing",
      image: prod.image
    };
    setOrders(prev => [newOrd, ...prev]);
    setActiveNavTab("profile");
    setProfileTab("orders");
    alert("✅ Order placed successfully! " + prod.name + " is on its way.");
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
    setShowEditProfileModal(false);
    setIsNewUser(false);
  };

  const handleDeletePost = (postId) => {
    if (window.confirm("Are you sure you want to delete this post as Admin?")) {
      setFeedVideos(prev => prev.filter(v => v.id !== postId));
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

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(ord => ord.id === orderId ? { ...ord, status: newStatus } : ord));
  };

  const filteredChallenges = selectedCategory === "All"
    ? challenges
    : challenges.filter(c => c.category === selectedCategory);

  const topLeaderboardEntries = [...challengeSubmissions].sort((a, b) => b.votes - a.votes).slice(0, 3);

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
            You've been automatically signed in as <strong style={{ color: "#f97316" }}>{currentUser?.name}</strong>.<br />
            Customize your profile below to get started.
          </p>
          
          <div style={{
            background: appSettings.darkMode ? "#141210" : "#fff7ed",
            borderRadius: "16px",
            padding: "16px",
            marginBottom: "20px",
            border: "1px solid #fed7aa",
            textAlign: "left"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
              <img 
                src={currentUser?.avatar || "https://i.pravatar.cc/150?img=1"} 
                alt="avatar" 
                style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover" }} 
              />
              <div>
                <div style={{ fontWeight: "1000", fontSize: "14px", color: appSettings.darkMode ? "#fff" : "#17120f" }}>
                  {currentUser?.name}
                </div>
                <div style={{ fontSize: "12px", color: "#a8a29e" }}>
                  {currentUser?.handle}
                </div>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => {
              setIsNewUser(false);
              setShowEditProfileModal(true);
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
            ✏️ Customize My Profile
          </button>
          <button
            onClick={() => {
              setIsNewUser(false);
              alert("🎉 Welcome! Explore challenges, order products, and join the BIGF community!");
            }}
            style={{
              background: "transparent",
              border: "none",
              color: "#a8a29e",
              padding: "12px",
              fontWeight: "700",
              fontSize: "13px",
              cursor: "pointer",
              marginTop: "8px",
              width: "100%"
            }}
          >
            Skip for now
          </button>
        </div>
      </div>
    );
  };

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
      
      {isNewUser && currentUser && <WelcomeModal />}

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
          
          <button onClick={() => setActiveNavTab("notifications")} style={{ backgroundColor: activeNavTab==="notifications"?"#f97316":(appSettings.darkMode ? "#2a2421" : "rgba(249,115,22,.08)"), border: "1px solid rgba(249,115,22,.3)", padding: "9px 12px", borderRadius: "12px", fontWeight: "800", cursor: "pointer", color: activeNavTab==="notifications"?"#fff":"#c2410c" }}>
            🔔
          </button>

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
                  <p style={{ margin: 0, fontSize: "13px", color: "#a8a29e", fontWeight: "700" }}>Manage orders, create new challenges, and moderate community challenge content.</p>
                </div>
                <button onClick={handleLogoutAdmin} style={{ background: "#dc2626", color: "#fff", border: "none", padding: "10px 18px", borderRadius: "12px", fontWeight: "1000", fontSize: "12px", cursor: "pointer" }}>
                  🚪 Logout Admin
                </button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
                <div style={{ background: appSettings.darkMode ? "#1e1b18" : "#ffffff", padding: "20px", borderRadius: "20px", border: "1px solid #fed7aa" }}>
                  <span style={{ fontSize: "11px", color: "#a8a29e", fontWeight: "900", textTransform: "uppercase" }}>Total Orders</span>
                  <div style={{ fontSize: "28px", fontWeight: "1000", color: "#c2410c", margin: "6px 0 2px" }}>{orders.length}</div>
                </div>
                <div style={{ background: appSettings.darkMode ? "#1e1b18" : "#ffffff", padding: "20px", borderRadius: "20px", border: "1px solid #fed7aa" }}>
                  <span style={{ fontSize: "11px", color: "#a8a29e", fontWeight: "900", textTransform: "uppercase" }}>Active Challenges</span>
                  <div style={{ fontSize: "28px", fontWeight: "1000", color: "#c2410c", margin: "6px 0 2px" }}>{challenges.length}</div>
                </div>
                <div style={{ background: appSettings.darkMode ? "#1e1b18" : "#ffffff", padding: "20px", borderRadius: "20px", border: "1px solid #fed7aa" }}>
                  <span style={{ fontSize: "11px", color: "#a8a29e", fontWeight: "900", textTransform: "uppercase" }}>Store Products</span>
                  <div style={{ fontSize: "28px", fontWeight: "1000", color: "#c2410c", margin: "6px 0 2px" }}>{products.length}</div>
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
                  <h3 style={{ margin: "0 0 16px 0", fontSize: "18px", fontWeight: "1000", color: appSettings.darkMode ? "#fff" : "#17120f" }}>🏆 Existing Challenges</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {challenges.map(chal => (
                      <div key={chal.id} style={{ background: appSettings.darkMode ? "#141210" : "#fff7ed", border: "1px solid #fed7aa", borderRadius: "16px", padding: "14px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                        <div>
                          <div style={{ fontSize: "13px", fontWeight: "1000", color: appSettings.darkMode ? "#fff" : "#17120f" }}>{chal.title}</div>
                          <div style={{ fontSize: "11px", color: "#c2410c", fontWeight: "900" }}>{chal.prize} • {chal.daysLeft} days remaining</div>
                        </div>
                        <button onClick={() => handleDeleteChallenge(chal.id)} style={{ background: "#fee2e2", color: "#dc2626", border: "1px solid #f87171", padding: "8px 12px", borderRadius: "10px", fontWeight: "1000", fontSize: "11px", cursor: "pointer" }}>
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ background: appSettings.darkMode ? "#1e1b18" : "#ffffff", padding: "24px", borderRadius: "24px", border: "1px solid #fed7aa" }}>
                  <h3 style={{ margin: "0 0 16px 0", fontSize: "18px", fontWeight: "1000", color: appSettings.darkMode ? "#fff" : "#17120f" }}>📦 Customer Orders</h3>
                  {orders.length === 0 ? (
                    <p style={{ color: "#a8a29e", fontSize: "13px", fontWeight: "700" }}>No customer orders placed yet.</p>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      {orders.map(ord => (
                        <div key={ord.id} style={{ background: appSettings.darkMode ? "#141210" : "#fff7ed", border: "1px solid #fed7aa", borderRadius: "16px", padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                          <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                            <img src={ord.image} alt={ord.item} style={{ width: "50px", height: "50px", borderRadius: "10px", objectFit: "cover" }} />
                            <div>
                              <div style={{ fontSize: "13px", fontWeight: "1000", color: appSettings.darkMode ? "#fff" : "#17120f" }}>{ord.item}</div>
                              <div style={{ fontSize: "11px", color: "#a8a29e", fontWeight: "800" }}>Customer: <strong style={{ color: "#c2410c" }}>{ord.customer}</strong> • {ord.total}</div>
                            </div>
                          </div>
                          <select
                            value={ord.status}
                            onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                            style={{ padding: "6px 10px", borderRadius: "8px", border: "1px solid #fed7aa", backgroundColor: appSettings.darkMode ? "#1e1b18" : "#fff", color: appSettings.darkMode ? "#fff" : "#000", fontSize: "11px", fontWeight: "800" }}
                          >
                            <option value="Processing">Processing</option>
                            <option value="Dispatched">Dispatched</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div style={{ background: appSettings.darkMode ? "#1e1b18" : "#ffffff", padding: "24px", borderRadius: "24px", border: "1px solid #fed7aa" }}>
                  <h3 style={{ margin: "0 0 16px 0", fontSize: "18px", fontWeight: "1000", color: appSettings.darkMode ? "#fff" : "#17120f" }}>🛡️ Challenge Submissions Moderation</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {challengeSubmissions.map(post => (
                      <div key={post.id} style={{ background: appSettings.darkMode ? "#141210" : "#fff7ed", border: "1px solid #fed7aa", borderRadius: "16px", padding: "14px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                          <img src={post.thumbnail} alt="thumb" style={{ width: "50px", height: "50px", borderRadius: "10px", objectFit: "cover" }} />
                          <div>
                            <div style={{ fontSize: "12px", fontWeight: "1000", color: appSettings.darkMode ? "#fff" : "#17120f" }}>{post.pioneer} ({post.handle})</div>
                            <div style={{ fontSize: "11px", color: "#a8a29e", fontWeight: "800", maxWidth: "300px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{post.caption}</div>
                          </div>
                        </div>
                        <button onClick={() => handleDeleteChallengeSubmission(post.id)} style={{ background: "#fee2e2", color: "#dc2626", border: "1px solid #f87171", padding: "8px 12px", borderRadius: "10px", fontWeight: "1000", fontSize: "11px", cursor: "pointer" }}>
                          Remove Submission
                        </button>
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
                  🏆 Join the Challenge & Win
                </button>
                <button onClick={() => document.getElementById("bigf-products")?.scrollIntoView({ behavior: "smooth" })} style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", padding: "14px 24px", borderRadius: "12px", fontWeight: "1000", fontSize: "13px", cursor: "pointer" }}>
                  🔥 Explore Products
                </button>
              </div>
            </section>

            <section id="bigf-products" style={{ background: appSettings.darkMode ? "#1e1b18" : "#fffaf5", border: "2px solid #fed7aa", borderRadius: "28px", padding: "32px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
                <div>
                  <span style={{ color: "#c2410c", fontSize: "10px", fontWeight: "1000", letterSpacing: "1.2px", textTransform: "uppercase" }}>OUR TASTY VARIETIES</span>
                  <h3 style={{ color: appSettings.darkMode ? "#fff" : "#17120f", fontSize: "24px", fontWeight: "1000", margin: "2px 0 0 0" }}>BIGF Product Line</h3>
                </div>
                <span style={{ fontSize: "12px", color: "#a8a29e", fontWeight: "700" }}>Different Flavours, One Family</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "18px" }}>
                {products.map(prod => (
                  <div key={prod.id} style={{ background: appSettings.darkMode ? "#141210" : "#ffffff", border: "1px solid #fed7aa", borderRadius: "20px", overflow: "hidden", padding: "18px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <img src={prod.image} alt={prod.name} style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "14px", marginBottom: "14px", backgroundColor: "#fef3c7" }} />
                      <span style={{ background: "#fef3c7", color: "#92400e", padding: "4px 10px", borderRadius: "8px", fontSize: "10px", fontWeight: "1000" }}>{prod.badge}</span>
                      <h4 style={{ color: appSettings.darkMode ? "#fff" : "#17120f", fontSize: "17px", fontWeight: "1000", margin: "8px 0 6px" }}>{prod.name}</h4>
                      <p style={{ color: "#a8a29e", fontSize: "12px", lineHeight: "1.5", margin: "0 0 14px" }}>{prod.description}</p>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(249,115,22,0.15)", paddingTop: "12px" }}>
                      <strong style={{ color: "#c2410c", fontSize: "14px" }}>{prod.price}</strong>
                      <button onClick={() => handleOrderProduct(prod)} style={{ background: "#f97316", color: "#17120f", border: "none", padding: "10px 14px", borderRadius: "10px", fontWeight: "1000", fontSize: "12px", cursor: "pointer" }}>
                        ORDER NOW
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section style={{ background: appSettings.darkMode ? "#1e1b18" : "#ffffff", border: "2px solid #fed7aa", borderRadius: "28px", padding: "36px 32px" }}>
              <div style={{ textAlign: "center", marginBottom: "28px" }}>
                <span style={{ background: "#fef3c7", color: "#92400e", padding: "6px 14px", borderRadius: "999px", fontSize: "10px", fontWeight: "1000", letterSpacing: "1.2px", textTransform: "uppercase" }}>
                  📖 WHY CHOOSE BIG F
                </span>
                <h3 style={{ fontSize: "26px", fontWeight: "1000", margin: "10px 0 6px 0", color: appSettings.darkMode ? "#fff" : "#17120f" }}>Crafted for Taste, Built for Real Life</h3>
                <p style={{ fontSize: "13px", color: "#a8a29e", maxWidth: "640px", margin: "0 auto", fontWeight: "700", lineHeight: "1.6" }}>
                  Everyday food made for real family life. Simple to cook, yours to make.
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

            <section style={{ background: appSettings.darkMode ? "#1e1b18" : "#fffaf5", border: "1px solid #fed7aa", borderRadius: "28px", padding: "32px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
                <div>
                  <span style={{ color: "#c2410c", fontSize: "10px", fontWeight: "1000", letterSpacing: "1.5px", textTransform: "uppercase" }}>COMMUNITY GAMIFICATION</span>
                  <h3 style={{ color: appSettings.darkMode ? "#fff" : "#17120f", fontSize: "24px", fontWeight: "1000", margin: "2px 0 0 0" }}>🏆 Top Voted Challenge Entries</h3>
                </div>
                <button onClick={() => { setSelectedHubChallenge(null); setActiveNavTab("challenge"); }} style={{ background: "#f97316", color: "#fff", border: "none", padding: "8px 14px", borderRadius: "10px", fontWeight: "1000", fontSize: "11px", cursor: "pointer" }}>
                  View All in Challenge Hub →
                </button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
                {topLeaderboardEntries.map((entry, idx) => (
                  <div key={entry.id} style={{ background: appSettings.darkMode ? "#141210" : "#ffffff", border: "1px solid #fed7aa", borderRadius: "20px", padding: "16px", display: "flex", flexDirection: "column", gap: "12px", position: "relative" }}>
                    <div style={{ position: "absolute", top: "10px", left: "10px", background: idx === 0 ? "#f59e0b" : idx === 1 ? "#94a3b8" : "#d97706", color: "#fff", width: "26px", height: "26px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "1000", fontSize: "12px", zIndex: 2 }}>
                      #{idx + 1}
                    </div>
                    <div style={{ width: "100%", height: "150px", borderRadius: "14px", overflow: "hidden", backgroundColor: "#000" }}>
                      <img src={entry.thumbnail} alt={entry.pioneer} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: "1000", color: appSettings.darkMode ? "#fff" : "#17120f" }}>{entry.pioneer}</div>
                      <div style={{ fontSize: "11px", color: "#c2410c", fontWeight: "900" }}>{entry.challengeTitle}</div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(249,115,22,0.15)", paddingTop: "10px" }}>
                      <span style={{ fontSize: "12px", fontWeight: "1000", color: "#f59e0b" }}>⭐ {entry.votes} Community Votes</span>
                      <button onClick={() => { setSelectedHubChallenge(challenges.find(c => c.id === entry.challengeId) || challenges[0]); setActiveNavTab("challenge"); }} style={{ background: "#fff7ed", color: "#c2410c", border: "1px solid #fed7aa", padding: "6px 10px", borderRadius: "8px", fontWeight: "1000", fontSize: "10px", cursor: "pointer" }}>
                        Vote
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section style={{ background: appSettings.darkMode ? "#1e1b18" : "#ffffff", border: "2px solid #fed7aa", borderRadius: "28px", padding: "32px" }}>
              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <span style={{ background: "#fef3c7", color: "#92400e", padding: "6px 14px", borderRadius: "999px", fontSize: "10px", fontWeight: "1000", letterSpacing: "1.2px", textTransform: "uppercase" }}>
                  🍜 FIND YOUR PERFECT NOODLE MATCH
                </span>
                <h3 style={{ fontSize: "24px", fontWeight: "1000", margin: "8px 0 4px 0", color: appSettings.darkMode ? "#fff" : "#17120f" }}>Interactive Flavor Quiz</h3>
                <p style={{ fontSize: "13px", color: "#a8a29e", fontWeight: "700" }}>Answer 2 quick questions to discover which BIGF flavor matches your cravings today!</p>
              </div>

              {!quizResult ? (
                <div style={{ maxWidth: "500px", margin: "0 auto", background: appSettings.darkMode ? "#141210" : "#fffaf5", border: "1px solid #fed7aa", borderRadius: "20px", padding: "24px" }}>
                  {quizStep === 1 && (
                    <div>
                      <h4 style={{ fontSize: "15px", fontWeight: "1000", color: appSettings.darkMode ? "#fff" : "#17120f", marginBottom: "14px" }}>Question 1: How much spice do you like in your noodles? 🌶️</h4>
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        <button onClick={() => { setQuizSpice("Mild & Comforting"); setQuizStep(2); }} style={{ padding: "12px 16px", borderRadius: "12px", border: "1px solid #fed7aa", background: appSettings.darkMode ? "#1e1b18" : "#fff", color: appSettings.darkMode ? "#fff" : "#000", fontWeight: "1000", fontSize: "13px", cursor: "pointer", textAlign: "left" }}>
                          🍲 Mild, savory, and soothing Asian broth (Chicken/Beef)
                        </button>
                        <button onClick={() => { setQuizSpice("Extra Spicy & Tangy"); setQuizStep(2); }} style={{ padding: "12px 16px", borderRadius: "12px", border: "1px solid #fed7aa", background: appSettings.darkMode ? "#1e1b18" : "#fff", color: appSettings.darkMode ? "#fff" : "#000", fontWeight: "1000", fontSize: "13px", cursor: "pointer", textAlign: "left" }}>
                          🔥 Bold Sichuan chili oil with sweet tangy kick (Sweet Chili)
                        </button>
                      </div>
                    </div>
                  )}

                  {quizStep === 2 && (
                    <div>
                      <h4 style={{ fontSize: "15px", fontWeight: "1000", color: appSettings.darkMode ? "#fff" : "#17120f", marginBottom: "14px" }}>Question 2: When do you usually enjoy your noodles? 🌙</h4>
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        <button onClick={() => {
                          const res = quizSpice === "Mild & Comforting" ? products[0] : products[2];
                          setQuizResult(res);
                        }} style={{ padding: "12px 16px", borderRadius: "12px", border: "1px solid #fed7aa", background: appSettings.darkMode ? "#1e1b18" : "#fff", color: appSettings.darkMode ? "#fff" : "#000", fontWeight: "1000", fontSize: "13px", cursor: "pointer", textAlign: "left" }}>
                          ☀️ Quick midday lunch at home or work
                        </button>
                        <button onClick={() => {
                          const res = quizSpice === "Mild & Comforting" ? products[1] : products[2];
                          setQuizResult(res);
                        }} style={{ padding: "12px 16px", borderRadius: "12px", border: "1px solid #fed7aa", background: appSettings.darkMode ? "#1e1b18" : "#fff", color: appSettings.darkMode ? "#fff" : "#000", fontWeight: "1000", fontSize: "13px", cursor: "pointer", textAlign: "left" }}>
                          🌙 Late-night craving snack
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ maxWidth: "500px", margin: "0 auto", background: appSettings.darkMode ? "#141210" : "#fffaf5", border: "2px solid #f97316", borderRadius: "20px", padding: "24px", textAlign: "center" }}>
                  <span style={{ fontSize: "11px", backgroundColor: "#fef3c7", color: "#92400e", padding: "4px 12px", borderRadius: "8px", fontWeight: "1000" }}>YOUR MATCH</span>
                  <h4 style={{ fontSize: "20px", fontWeight: "1000", color: appSettings.darkMode ? "#fff" : "#17120f", margin: "10px 0 6px 0" }}>{quizResult.name}</h4>
                  <img src={quizResult.image} alt={quizResult.name} style={{ width: "100%", height: "140px", objectFit: "cover", borderRadius: "12px", margin: "10px 0" }} />
                  <p style={{ fontSize: "12px", color: "#a8a29e", fontWeight: "700", marginBottom: "16px" }}>{quizResult.description}</p>
                  
                  <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                    <button onClick={() => { setQuizResult(null); setQuizStep(1); setQuizSpice(null); }} style={{ background: appSettings.darkMode ? "#2a2421" : "#fff", color: "#c2410c", border: "1px solid #fed7aa", padding: "10px 16px", borderRadius: "10px", fontWeight: "1000", fontSize: "12px", cursor: "pointer", width: "100%" }}>
                      Retake Quiz
                    </button>
                  </div>
                </div>
              )}
            </section>

            <section style={{ background: appSettings.darkMode ? "#1e1b18" : "#ffffff", border: "2px solid #fed7aa", borderRadius: "32px", padding: "36px 32px" }}>
              <div style={{ textAlign: "center", marginBottom: "24px" }}>
                <span style={{ background: "#fef3c7", color: "#92400e", padding: "6px 14px", borderRadius: "999px", fontSize: "10px", fontWeight: "1000", letterSpacing: "1.2px", textTransform: "uppercase" }}>
                  💬 COMMUNITY VOICE & SUGGESTIONS
                </span>
                <h3 style={{ fontSize: "26px", fontWeight: "1000", margin: "10px 0 6px 0", color: appSettings.darkMode ? "#fff" : "#17120f" }}>Share Your Feedback with Us</h3>
                <p style={{ fontSize: "13px", color: "#a8a29e", maxWidth: "540px", margin: "0 auto", fontWeight: "700", lineHeight: "1.5" }}>
                  What do you think of the website, challenges, and store? Tell us what could be improved!
                </p>
              </div>

              {feedbackSubmitted && (
                <div style={{ background: "#ecfdf5", border: "1px solid #10b981", color: "#065f46", padding: "14px 18px", borderRadius: "14px", fontSize: "13px", fontWeight: "1000", textAlign: "center", marginBottom: "20px" }}>
                  🎉 Thank you! Your feedback has been successfully submitted to the BIGF team.
                </div>
              )}

              <form onSubmit={handleFeedbackSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "700px", margin: "0 auto" }}>
                <textarea
                  placeholder="Tell us what you like or what could be improved..."
                  rows={4}
                  value={feedbackMessage}
                  onChange={(e) => setFeedbackMessage(e.target.value)}
                  style={{ width: "100%", padding: "12px 14px", borderRadius: "12px", border: "1px solid #fed7aa", backgroundColor: appSettings.darkMode ? "#141210" : "#fff7ed", color: appSettings.darkMode ? "#fff" : "#000", fontSize: "13px", fontWeight: "700", boxSizing: "border-box", resize: "none" }}
                />
                <button type="submit" style={{ background: "linear-gradient(135deg, #f97316 0%, #c2410c 100%)", color: "#fff", border: "none", padding: "14px", borderRadius: "14px", fontWeight: "1000", fontSize: "14px", cursor: "pointer" }}>
                  Submit Feedback & Suggestions 🚀
                </button>
              </form>
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
                      Take a BIGF challenge, publish your noodle video on TikTok, submit the link here, and let the community vote.
                    </p>
                    <div style={{ display: "flex", gap: "9px", flexWrap: "wrap", marginTop: "18px" }}>
                      <span style={{ background: "#f97316", padding: "7px 11px", borderRadius: "9px", fontSize: "10px", fontWeight: "1000" }}>🎥 VIDEO</span>
                      <span style={{ background: "rgba(255,255,255,.12)", padding: "7px 11px", borderRadius: "9px", fontSize: "10px", fontWeight: "1000" }}>🎵 TIKTOK</span>
                      <span style={{ background: "rgba(255,255,255,.12)", padding: "7px 11px", borderRadius: "9px", fontSize: "10px", fontWeight: "1000" }}>⭐ COMMUNITY VOTES</span>
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
                          🔥 VIEW CHALLENGE & VOTE
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
                    <div style={{ fontSize: "12px", fontWeight: "1000", color: "#c2410c" }}>🔥 HOW TO ENTER</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: "10px", marginTop: "10px" }}>
                      <div style={{ fontSize: "11px", fontWeight: "800" }}>1️⃣ Create your BIGF video</div>
                      <div style={{ fontSize: "11px", fontWeight: "800" }}>2️⃣ Post it on TikTok</div>
                      <div style={{ fontSize: "11px", fontWeight: "800" }}>3️⃣ Copy the TikTok link</div>
                    </div>
                    <button onClick={() => {
                      setTargetChallengeForUpload(selectedHubChallenge);
                      setChallengeActionType("social");
                      setExternalSocialUrl("");
                      setSocialCaption("");
                      setShowChallengeActionModal(true);
                    }} style={{ marginTop: "14px", background: "#f97316", color: "#fff", border: "none", padding: "12px 20px", borderRadius: "14px", fontWeight: "1000", fontSize: "13px", cursor: "pointer" }}>
                      🎵 SUBMIT TIKTOK ENTRY
                    </button>
                  </div>
                </div>

                <div>
                  <h3 style={{ fontSize: "18px", fontWeight: "1000", color: appSettings.darkMode ? "#fff" : "#17120f", marginBottom: "16px" }}>
                    🎥 Challenge Submissions & Voting ({challengeSubmissions.filter(v => v.challengeId === selectedHubChallenge.id).length})
                  </h3>

                  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    {challengeSubmissions.filter(v => v.challengeId === selectedHubChallenge.id).map(post => (
                      <div key={post.id} style={{ background: appSettings.darkMode ? "#1e1b18" : "#ffffff", border: "1px solid #fed7aa", borderRadius: "24px", overflow: "hidden" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", borderBottom: "1px solid rgba(249,115,22,0.15)" }}>
                          <span style={{ fontSize: "12px", fontWeight: "1000", color: appSettings.darkMode ? "#fff" : "#17120f" }}>{post.pioneer} ({post.handle})</span>
                          {post.handle !== currentUser?.handle && (
                            <button onClick={() => handleFollowUser(post.id)} style={{ background: post.isFollowing ? "#e5e7eb" : "#f97316", color: post.isFollowing ? "#374151" : "#fff", border: "none", padding: "5px 12px", borderRadius: "8px", fontWeight: "1000", fontSize: "11px", cursor: "pointer" }}>
                              {post.isFollowing ? "✓ Following" : "+ Follow"}
                            </button>
                          )}
                        </div>
                        <div style={{ position: "relative", width: "100%", height: "360px", backgroundColor: "#000" }}>
                          <img src={post.thumbnail} alt="Challenge entry" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                        <div style={{ padding: "14px 18px 8px 18px" }}>
                          <p style={{ margin: 0, fontSize: "13px", color: appSettings.darkMode ? "#f5f5f4" : "#17120f", fontWeight: "700" }}>{post.caption}</p>
                          {post.tiktokUrl && (
                            <a href={post.tiktokUrl} target="_blank" rel="noreferrer" style={{ display: "inline-flex", marginTop: "10px", background: "#17120f", color: "#fff", padding: "8px 12px", borderRadius: "10px", textDecoration: "none", fontSize: "11px", fontWeight: "1000" }}>
                              🎵 WATCH ON TIKTOK →
                            </a>
                          )}
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 18px", borderTop: "1px solid rgba(249,115,22,0.15)" }}>
                          <button onClick={() => handleVotePost(post.id)} style={{ background: post.votedByMe ? "#f97316" : (appSettings.darkMode ? "#2a2421" : "#fff7ed"), color: post.votedByMe ? "#fff" : "#c2410c", border: "1px solid #fed7aa", padding: "8px 14px", borderRadius: "12px", cursor: "pointer", fontWeight: "1000", fontSize: "13px" }}>
                            {post.votedByMe ? "🗳️ Voted" : "⭐ Vote for this challenge entry"} ({post.votes})
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* FEED VIEW */}
        {activeNavTab === "feed" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "560px", margin: "0 auto" }}>
            <div style={{ background: appSettings.darkMode ? "#1e1b18" : "#ffffff", padding: "20px 24px", borderRadius: "24px", border: "1px solid #fed7aa" }}>
              <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "1000", color: appSettings.darkMode ? "#fff" : "#17120f" }}>🔥 Community Social Feed</h2>
              <p style={{ margin: "2px 0 0 0", fontSize: "12px", color: "#a8a29e", fontWeight: "700" }}>Explore BIGF food moments, recipes, jokes and everyday community posts. This feed is just for fun — challenge entries stay in the Challenge Hub.</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {feedVideos.map(post => (
                <div key={post.id} style={{ background: appSettings.darkMode ? "#1e1b18" : "#ffffff", border: "1px solid #fed7aa", borderRadius: "28px", overflow: "hidden" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: "1px solid rgba(249,115,22,0.15)" }}>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: "1000", color: appSettings.darkMode ? "#fff" : "#17120f" }}>{post.pioneer}</div>
                      <span style={{ fontSize: "11px", color: "#a8a29e", fontWeight: "800" }}>{post.handle} • BIGF Community</span>
                    </div>
                    {post.handle !== currentUser?.handle && (
                      <button onClick={() => handleFollowUser(post.id)} style={{ background: post.isFollowing ? (appSettings.darkMode ? "#2a2421" : "#f3f4f6") : "#f97316", color: post.isFollowing ? (appSettings.darkMode ? "#d1d5db" : "#374151") : "#fff", border: "none", padding: "6px 14px", borderRadius: "10px", fontWeight: "1000", fontSize: "12px", cursor: "pointer" }}>
                        {post.isFollowing ? "✓ Following" : "+ Follow"}
                      </button>
                    )}
                  </div>

                  <div style={{ position: "relative", width: "100%", height: "400px", backgroundColor: "#000" }}>
                    <img src={post.thumbnail} alt="Video" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>

                  <div style={{ padding: "16px 20px 8px 20px" }}>
                    <p style={{ margin: 0, fontSize: "14px", color: appSettings.darkMode ? "#f5f5f4" : "#17120f", fontWeight: "700" }}>{post.caption}</p>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", borderTop: "1px solid rgba(249,115,22,0.15)" }}>
                    <button onClick={() => handleLikeFeedItem(post.id)} style={{ background: post.likedByMe ? "#f97316" : (appSettings.darkMode ? "#2a2421" : "#fff7ed"), color: post.likedByMe ? "#fff" : "#c2410c", border: "1px solid #fed7aa", padding: "8px 14px", borderRadius: "12px", cursor: "pointer", fontWeight: "1000", fontSize: "13px" }}>
                      {post.likedByMe ? "❤️ Liked" : "🤍 Like"} ({post.likes})
                    </button>
                    <button onClick={() => handleRepost(post.id)} style={{ background: post.repostedByMe ? "#059669" : (appSettings.darkMode ? "#2a2421" : "#fff7ed"), color: post.repostedByMe ? "#fff" : "#059669", border: "1px solid #a7f3d0", padding: "8px 14px", borderRadius: "12px", cursor: "pointer", fontWeight: "1000", fontSize: "13px" }}>
                      {post.repostedByMe ? "🔁 Reposted" : "🔁 Repost"} ({post.reposts})
                    </button>
                  </div>

                  <div style={{ background: appSettings.darkMode ? "#141210" : "#fffaf5", padding: "16px 20px", borderTop: "1px solid rgba(249,115,22,0.15)" }}>
                    <h4 style={{ margin: "0 0 12px 0", fontSize: "13px", fontWeight: "1000", color: "#c2410c", textTransform: "uppercase" }}>
                      💬 Comments ({post.comments.length})
                    </h4>
                    <form onSubmit={(e) => handleAddComment(post.id, e)} style={{ display: "flex", gap: "8px" }}>
                      <input
                        type="text"
                        placeholder="Write a comment..."
                        value={newCommentText}
                        onChange={(e) => setNewCommentText(e.target.value)}
                        style={{ flex: 1, padding: "10px 14px", borderRadius: "12px", border: "1px solid #fed7aa", backgroundColor: appSettings.darkMode ? "#1e1b18" : "#fff", color: appSettings.darkMode ? "#fff" : "#000", fontSize: "12px", fontWeight: "700" }}
                      />
                      <button type="submit" style={{ background: "#f97316", color: "#fff", border: "none", padding: "10px 16px", borderRadius: "12px", fontWeight: "1000", fontSize: "12px", cursor: "pointer" }}>
                        Post
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROFILE VIEW - Simplified for brevity, but complete in original code */}
        {activeNavTab === "profile" && (
          <div style={{ background: appSettings.darkMode ? "#1e1b18" : "#ffffff", border: "1px solid rgba(249,115,22,0.25)", borderRadius: "28px", maxWidth: "600px", margin: "0 auto", overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: "1px solid rgba(249,115,22,0.15)" }}>
              <span style={{ fontSize: "15px", fontWeight: "1000", color: appSettings.darkMode ? "#fff" : "#17120f" }}>
                {currentUser?.handle || "@user"}
              </span>
              <button onClick={() => setShowEditProfileModal(true)} style={{ background: "#f97316", color: "#fff", border: "none", padding: "7px 13px", borderRadius: "8px", fontWeight: "1000", fontSize: "11px", cursor: "pointer" }}>
                ✏️ Edit Profile
              </button>
            </div>

            <div style={{ padding: "24px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              <img src={currentUser?.avatar || "https://i.pravatar.cc/150?img=1"} alt={currentUser?.name || "User"} style={{ width: "96px", height: "96px", borderRadius: "50%", objectFit: "cover", border: "3px solid #f97316", marginBottom: "12px" }} />
              <h3 style={{ margin: "0 0 3px 0", fontSize: "18px", fontWeight: "1000", color: appSettings.darkMode ? "#fff" : "#17120f" }}>{currentUser?.name || "New User"}</h3>
              <p style={{ fontSize: "13px", color: "#a8a29e", margin: "0 0 12px 0", fontWeight: "700" }}>{currentUser?.handle || "@user"}</p>

              <div style={{ display: "flex", alignItems: "center", gap: "24px", marginBottom: "14px", background: appSettings.darkMode ? "#141210" : "#fff7ed", padding: "11px 24px", borderRadius: "16px", border: "1px solid #fed7aa" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "16px", fontWeight: "1000", color: "#c2410c" }}>{currentUser?.followers || 0}</div>
                  <div style={{ fontSize: "10px", color: "#a8a29e", fontWeight: "900", textTransform: "uppercase" }}>Followers</div>
                </div>
                <div style={{ width: "1px", height: "30px", backgroundColor: "#fed7aa" }} />
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "16px", fontWeight: "1000", color: "#c2410c" }}>{currentUser?.following || 0}</div>
                  <div style={{ fontSize: "10px", color: "#a8a29e", fontWeight: "900", textTransform: "uppercase" }}>Following</div>
                </div>
              </div>

              <p style={{ fontSize: "12px", color: appSettings.darkMode ? "#d6d3d1" : "#44403c", margin: "0", fontWeight: "600", maxWidth: "450px", lineHeight: "1.5" }}>
                {currentUser?.bio || "No bio yet."}
              </p>
            </div>

            <div style={{ display: "flex", borderTop: "1px solid rgba(249,115,22,0.15)", borderBottom: "1px solid rgba(249,115,22,0.15)" }}>
              <button onClick={() => setProfileTab("videos")} style={{ flex: 1, padding: "13px 8px", background: "none", border: "none", borderBottom: profileTab === "videos" ? "2px solid #f97316" : "2px solid transparent", fontWeight: "1000", fontSize: "12px", color: profileTab === "videos" ? "#f97316" : "#a8a29e", cursor: "pointer" }}>
                📹 Submissions
              </button>
              <button onClick={() => setProfileTab("reposts")} style={{ flex: 1, padding: "13px 8px", background: "none", border: "none", borderBottom: profileTab === "reposts" ? "2px solid #f97316" : "2px solid transparent", fontWeight: "1000", fontSize: "12px", color: profileTab === "reposts" ? "#f97316" : "#a8a29e", cursor: "pointer" }}>
                🔁 Reposts
              </button>
              <button onClick={() => setProfileTab("orders")} style={{ flex: 1, padding: "13px 8px", background: "none", border: "none", borderBottom: profileTab === "orders" ? "2px solid #f97316" : "2px solid transparent", fontWeight: "1000", fontSize: "12px", color: profileTab === "orders" ? "#f97316" : "#a8a29e", cursor: "pointer" }}>
                🛒 Orders
              </button>
            </div>

            <div style={{ padding: "16px", minHeight: "220px", background: appSettings.darkMode ? "#141210" : "#fafaf9" }}>
              {profileTab === "videos" && (
                <div>
                  {currentUser?.submissions?.length > 0 ? (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "10px" }}>
                      {currentUser.submissions.map((submission, index) => (
                        <div key={submission.id || index} style={{ background: appSettings.darkMode ? "#1e1b18" : "#ffffff", border: "1px solid #fed7aa", borderRadius: "14px", overflow: "hidden" }}>
                          {submission.thumbnail && (
                            <img src={submission.thumbnail} alt="Submission" style={{ width: "100%", height: "130px", objectFit: "cover" }} />
                          )}
                          <div style={{ padding: "9px" }}>
                            <div style={{ fontSize: "11px", fontWeight: "900", color: appSettings.darkMode ? "#fff" : "#17120f" }}>
                              {submission.title || "BIGF Submission"}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ textAlign: "center", padding: "45px 20px" }}>
                      <div style={{ fontSize: "35px", marginBottom: "10px" }}>📹</div>
                      <div style={{ fontSize: "14px", fontWeight: "1000", color: appSettings.darkMode ? "#fff" : "#17120f", marginBottom: "5px" }}>No submissions yet</div>
                      <div style={{ fontSize: "11px", color: "#a8a29e" }}>Join a BIGF challenge and post your first submission.</div>
                    </div>
                  )}
                </div>
              )}
              {profileTab === "reposts" && (
                <div>
                  {currentUser?.reposts?.length > 0 ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {currentUser.reposts.map((repost, index) => (
                        <div key={repost.id || index} style={{ background: appSettings.darkMode ? "#1e1b18" : "#ffffff", border: "1px solid #fed7aa", borderRadius: "14px", padding: "13px" }}>
                          <div style={{ fontSize: "12px", fontWeight: "1000", color: appSettings.darkMode ? "#fff" : "#17120f" }}>
                            {repost.title || "BIGF Repost"}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ textAlign: "center", padding: "45px 20px" }}>
                      <div style={{ fontSize: "35px", marginBottom: "10px" }}>🔁</div>
                      <div style={{ fontSize: "14px", fontWeight: "1000", color: appSettings.darkMode ? "#fff" : "#17120f", marginBottom: "5px" }}>No reposts yet</div>
                      <div style={{ fontSize: "11px", color: "#a8a29e" }}>Reposted BIGF community content will appear here.</div>
                    </div>
                  )}
                </div>
              )}
              {profileTab === "orders" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {orders?.length > 0 ? (
                    orders.map((ord) => (
                      <div key={ord.id} style={{ background: appSettings.darkMode ? "#1e1b18" : "#ffffff", border: "1px solid #fed7aa", borderRadius: "16px", padding: "14px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
                        <div>
                          <span style={{ fontSize: "12px", fontWeight: "1000", color: appSettings.darkMode ? "#fff" : "#17120f", display: "block", marginBottom: "4px" }}>
                            {ord.item}
                          </span>
                          <span style={{ fontSize: "11px", color: "#a8a29e", fontWeight: "700" }}>
                            {ord.date} • <strong style={{ color: "#c2410c" }}>{ord.total}</strong>
                          </span>
                        </div>
                        <span style={{ fontSize: "10px", backgroundColor: "#fef3c7", color: "#92400e", padding: "5px 9px", borderRadius: "8px", fontWeight: "1000", whiteSpace: "nowrap" }}>
                          {ord.status}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div style={{ textAlign: "center", padding: "45px 20px" }}>
                      <div style={{ fontSize: "35px", marginBottom: "10px" }}>🛒</div>
                      <div style={{ fontSize: "14px", fontWeight: "1000", color: appSettings.darkMode ? "#fff" : "#17120f", marginBottom: "5px" }}>No orders yet</div>
                      <div style={{ fontSize: "11px", color: "#a8a29e" }}>Your BIGF purchases will appear here.</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* NOTIFICATIONS VIEW */}
        {activeNavTab === "notifications" && (
          <div style={{ maxWidth: "500px", margin: "0 auto", background: appSettings.darkMode ? "#1e1b18" : "#ffffff", borderRadius: "28px", padding: "28px", border: "1px solid rgba(249,115,22,0.25)" }}>
            <h3 style={{ margin: "0 0 16px 0", fontSize: "18px", fontWeight: "1000", color: appSettings.darkMode ? "#fff" : "#17120f" }}>🔔 Notifications</h3>
            <div style={{ backgroundColor: appSettings.darkMode ? "#141210" : "#fff7ed", padding: "14px", borderRadius: "14px", border: "1px solid #fed7aa" }}>
              <div style={{ fontSize: "13px", fontWeight: "900", color: appSettings.darkMode ? "#fff" : "#17120f" }}>Use Ctrl + Shift + A to log in as admin anytime.</div>
            </div>
          </div>
        )}
      </main>

      {/* ADMIN LOGIN MODAL */}
      {showAdminLoginModal && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", zIndex: 400 }}>
          <div style={{ background: appSettings.darkMode ? "#1e1b18" : "#ffffff", color: appSettings.darkMode ? "#fff" : "#17120f", borderRadius: "28px", maxWidth: "420px", width: "100%", padding: "28px", border: "2px solid #dc2626" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
              <span style={{ fontSize: "11px", fontWeight: "1000", color: "#dc2626", textTransform: "uppercase" }}>Restricted Access</span>
              <button onClick={() => setShowAdminLoginModal(false)} style={{ background: "none", border: "none", fontSize: "16px", cursor: "pointer", fontWeight: "bold", color: appSettings.darkMode ? "#fff" : "#000" }}>✕</button>
            </div>
            
            <h3 style={{ fontSize: "20px", fontWeight: "1000", color: appSettings.darkMode ? "#fff" : "#17120f", margin: "0 0 6px 0" }}>Admin Dashboard Login</h3>
            <p style={{ fontSize: "13px", color: "#a8a29e", lineHeight: "1.5", margin: "0 0 16px 0" }}>
              Enter administrator passcode. (Hint: <strong style={{ color: "#dc2626" }}>admin123</strong> or <strong style={{ color: "#dc2626" }}>BIGF2026</strong>)
            </p>

            <form onSubmit={handleAdminLogin} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <input
                type="password"
                placeholder="Enter passcode..."
                value={adminPasscode}
                onChange={(e) => setAdminPasscode(e.target.value)}
                style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid #fed7aa", backgroundColor: appSettings.darkMode ? "#141210" : "#fff", color: appSettings.darkMode ? "#fff" : "#000", fontSize: "13px", fontWeight: "700", boxSizing: "border-box" }}
              />
              <button type="submit" style={{ background: "#dc2626", color: "#ffffff", border: "none", padding: "14px", borderRadius: "12px", fontWeight: "1000", fontSize: "14px", cursor: "pointer" }}>
                Login to Admin Dashboard →
              </button>
            </form>
          </div>
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
              <input
                type="text"
                value={editAvatar}
                onChange={(e) => setEditAvatar(e.target.value)}
                placeholder="Profile Image URL"
                style={{ width: "100%", padding: "10px", borderRadius: "10px", border: "1px solid #fed7aa", backgroundColor: appSettings.darkMode ? "#141210" : "#fff", color: appSettings.darkMode ? "#fff" : "#000", fontSize: "13px", fontWeight: "700", boxSizing: "border-box" }}
              />
              <textarea
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                placeholder="Bio"
                rows={2}
                style={{ width: "100%", padding: "10px", borderRadius: "10px", border: "1px solid #fed7aa", backgroundColor: appSettings.darkMode ? "#141210" : "#fff", color: appSettings.darkMode ? "#fff" : "#000", fontSize: "13px", fontWeight: "700", boxSizing: "border-box", resize: "none" }}
              />
              <button type="submit" style={{ background: "#f97316", color: "#fff", border: "none", padding: "14px", borderRadius: "12px", fontWeight: "1000", width: "100%", cursor: "pointer" }}>
                Save Profile Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {/* CHALLENGE ACTION MODAL */}
      {showChallengeActionModal && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", zIndex: 400 }}>
          <div style={{ background: appSettings.darkMode ? "#1e1b18" : "#ffffff", color: appSettings.darkMode ? "#fff" : "#17120f", borderRadius: "28px", maxWidth: "480px", width: "100%", padding: "28px", border: "2px solid #fed7aa" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <div>
                <span style={{ fontSize: "11px", fontWeight: "1000", color: "#c2410c", textTransform: "uppercase" }}>🔥 Challenge Entry</span>
                <h3 style={{ margin: "5px 0 0", fontSize: "20px", fontWeight: "1000" }}>Submit your TikTok</h3>
              </div>
              <button onClick={() => setShowChallengeActionModal(false)} style={{ background: "none", border: "none", fontSize: "16px", cursor: "pointer", fontWeight: "bold", color: appSettings.darkMode ? "#fff" : "#000" }}>✕</button>
            </div>
            <div style={{ background: appSettings.darkMode ? "#2a2421" : "#fff7ed", border: "1px solid #fed7aa", borderRadius: "14px", padding: "13px", marginBottom: "14px" }}>
              <div style={{ fontSize: "12px", fontWeight: "1000", color: "#c2410c" }}>🎵 TikTok submissions only</div>
              <div style={{ fontSize: "11px", color: "#a8a29e", fontWeight: "700", marginTop: "4px" }}>Publish your BIGF challenge video on TikTok first, then paste the video URL below.</div>
            </div>
            <form onSubmit={handleSocialUrlSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <input type="url" placeholder="https://www.tiktok.com/@yourhandle/video/..." value={externalSocialUrl} onChange={(e) => setExternalSocialUrl(e.target.value)} style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid #fed7aa", backgroundColor: appSettings.darkMode ? "#1e1b18" : "#fff", color: appSettings.darkMode ? "#fff" : "#000", fontSize: "13px", fontWeight: "700", boxSizing: "border-box" }} />
              <textarea placeholder="Tell us what you created..." value={socialCaption} onChange={(e) => setSocialCaption(e.target.value)} rows={3} style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid #fed7aa", backgroundColor: appSettings.darkMode ? "#141210" : "#fff", color: appSettings.darkMode ? "#fff" : "#000", fontSize: "13px", fontWeight: "700", boxSizing: "border-box", resize: "none" }} />
              <button type="submit" style={{ background: "#f97316", color: "#fff", border: "none", padding: "13px", borderRadius: "12px", fontWeight: "1000", cursor: "pointer" }}>
                Submit TikTok Entry →
              </button>
            </form>
          </div>
        </div>
      )}

      {/* FREESTYLE POST MODAL */}
      {showFreestyleModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "20px" }}>
          <div style={{ background: appSettings.darkMode ? "#1e1b18" : "#fff", padding: "24px", borderRadius: "24px", width: "100%", maxWidth: "480px", border: "1px solid #fed7aa", boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "1000", color: appSettings.darkMode ? "#fff" : "#17120f" }}>✨ Create Freestyle Post</h3>
              <button onClick={() => setShowFreestyleModal(false)} style={{ background: "none", border: "none", fontSize: "18px", cursor: "pointer", color: "#a8a29e", fontWeight: "900" }}>✕</button>
            </div>

            <form onSubmit={handleCreatePost} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={{ fontSize: "11px", fontWeight: "1000", display: "block", marginBottom: "6px" }}>Caption / Thoughts</label>
                <textarea
                  rows="3"
                  placeholder="What's cooking with your BIGF noodles today? 🍜"
                  value={newPostCaption}
                  onChange={(e) => setNewPostCaption(e.target.value)}
                  style={{ width: "100%", padding: "12px", borderRadius: "12px", border: "1px solid #fed7aa", backgroundColor: appSettings.darkMode ? "#141210" : "#fff", color: appSettings.darkMode ? "#fff" : "#000", fontSize: "13px", fontWeight: "700", boxSizing: "border-box" }}
                />
              </div>

              <div>
                <label style={{ fontSize: "11px", fontWeight: "1000", display: "block", marginBottom: "6px" }}>Upload Media (Photo/Video)</label>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setNewPostMedia(e.target.files[0]);
                    }
                  }}
                  style={{ width: "100%", fontSize: "12px", padding: "8px", borderRadius: "10px", border: "1px solid #fed7aa", backgroundColor: appSettings.darkMode ? "#141210" : "#fff", color: appSettings.darkMode ? "#fff" : "#000" }}
                />
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button type="button" onClick={() => setShowFreestyleModal(false)} style={{ flex: 1, background: "transparent", border: "1px solid #fed7aa", padding: "12px", borderRadius: "12px", fontWeight: "900", cursor: "pointer", color: appSettings.darkMode ? "#fff" : "#17120f" }}>
                  Cancel
                </button>
                <button type="submit" style={{ flex: 1, background: "linear-gradient(135deg, #f97316, #c2410c)", color: "#fff", border: "none", padding: "12px", borderRadius: "12px", fontWeight: "1000", cursor: "pointer" }}>
                  Post to Feed 🚀
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* APP-STYLE SETTINGS MODAL */}
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
        <button onClick={() => { setSelectedHubChallenge(null); setActiveNavTab("home"); }} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", color: activeNavTab==="home"?"#c2410c":"#a8a29e", fontWeight: "1000", fontSize: "12px", pointerEvents: "auto" }}>🏠 Home</button>
        <button onClick={() => { setSelectedHubChallenge(null); setActiveNavTab("challenge"); }} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", color: activeNavTab==="challenge"?"#c2410c":"#a8a29e", fontWeight: "1000", fontSize: "12px", pointerEvents: "auto" }}>🏆 Challenge</button>
        
        <button onClick={() => {
          setNewPostCaption("");
          setNewPostMedia(null);
          setShowFreestyleModal(true);
        }} style={{ width: "48px", height: "48px", borderRadius: "50%", border: "2px solid #fff", cursor: "pointer", background: "linear-gradient(135deg,#f97316,#c2410c)", color: "#fff", fontSize: "24px", fontWeight: "900", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 15px rgba(249,115,22,0.4)", pointerEvents: "auto" }}>+</button>
        
        <button onClick={() => { setSelectedHubChallenge(null); setActiveNavTab("feed"); }} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", color: activeNavTab==="feed"?"#c2410c":"#a8a29e", fontWeight: "1000", fontSize: "12px", pointerEvents: "auto" }}>🔥 Feed</button>
        
        {isAdmin && (
          <button onClick={() => { setSelectedHubChallenge(null); setActiveNavTab("admin"); }} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", color: activeNavTab==="admin"?"#dc2626":"#a8a29e", fontWeight: "1000", fontSize: "12px", pointerEvents: "auto" }}>🛠️ Admin</button>
        )}

        <button onClick={() => { setSelectedHubChallenge(null); setActiveNavTab("profile"); }} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", color: activeNavTab==="profile"?"#c2410c":"#a8a29e", fontWeight: "1000", fontSize: "12px", pointerEvents: "auto" }}>
          {currentUser ? (
            <img src={currentUser.avatar} alt="avatar" style={{ width: "28px", height: "28px", borderRadius: "50%", objectFit: "cover", border: "2px solid #f97316" }} />
          ) : (
            "👤"
          )}
          <span style={{ fontSize: "9px", marginTop: "2px" }}>Profile</span>
        </button>
      </nav>
    </div>
  );
}