import { useEffect, useState } from "react";
import { X, Share, PlusSquare } from "lucide-react";

/**
 * Shows an iOS-style "Add to Home Screen" banner.
 * iOS does not fire the `beforeinstallprompt` event, so we detect the
 * platform via user-agent and prompt the user manually.
 */
const IOSInstallPrompt = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Only show on iOS Safari that hasn't installed the PWA yet
        const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);
        const isInStandaloneMode =
            "standalone" in window.navigator && window.navigator.standalone;
        const dismissed = sessionStorage.getItem("ios-install-dismissed");

        if (isIos && !isInStandaloneMode && !dismissed) {
            // Small delay so it doesn't flash immediately on page load
            const timer = setTimeout(() => setVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const dismiss = () => {
        sessionStorage.setItem("ios-install-dismissed", "1");
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 px-4" style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}>
            <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-4 max-w-sm mx-auto">
                <button
                    onClick={dismiss}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Dismiss"
                >
                    <X size={18} />
                </button>

                <div className="flex items-center gap-3 mb-3">
                    <img
                        src="/icons/icon-72x72.png"
                        alt="Money Manager"
                        className="w-12 h-12 rounded-xl"
                    />
                    <div>
                        <p className="font-semibold text-gray-900 text-sm">Money Manager</p>
                        <p className="text-xs text-gray-500">Install on your iPhone</p>
                    </div>
                </div>

                <p className="text-sm text-gray-600 mb-3">
                    Add this app to your Home Screen for quick access and a full-screen
                    experience.
                </p>

                <ol className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center gap-2">
                        <span className="flex-shrink-0 w-5 h-5 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center text-xs font-bold">
                            1
                        </span>
                        <span>
                            Tap the{" "}
                            <Share size={14} className="inline text-blue-500" />{" "}
                            <strong>Share</strong> button in Safari
                        </span>
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="flex-shrink-0 w-5 h-5 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center text-xs font-bold">
                            2
                        </span>
                        <span>
                            Tap{" "}
                            <PlusSquare size={14} className="inline text-gray-700" />{" "}
                            <strong>Add to Home Screen</strong>
                        </span>
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="flex-shrink-0 w-5 h-5 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center text-xs font-bold">
                            3
                        </span>
                        <span>
                            Tap <strong>Add</strong> in the top-right corner
                        </span>
                    </li>
                </ol>

                <button
                    onClick={dismiss}
                    className="mt-4 w-full py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium transition-colors"
                >
                    Got it
                </button>
            </div>
        </div>
    );
};

export default IOSInstallPrompt;
