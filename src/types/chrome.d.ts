// Type definitions for Chrome extension API
// This is a simplified version for our project

interface TabChangeInfo {
  status?: string;
  url?: string;
  pinned?: boolean;
  audible?: boolean;
  discarded?: boolean;
  autoDiscardable?: boolean;
  mutedInfo?: any;
  favIconUrl?: string;
  title?: string;
}

interface Tab {
  id?: number;
  index: number;
  pinned: boolean;
  highlighted: boolean;
  windowId: number;
  active: boolean;
  discarded: boolean;
  autoDiscardable: boolean;
  url?: string;
  title?: string;
  favIconUrl?: string;
  status?: string;
  incognito: boolean;
  width?: number;
  height?: number;
  sessionId?: string;
}

interface Chrome {
  runtime: {
    onInstalled: {
      addListener: (callback: (details: any) => void) => void;
    };
    onMessage: {
      addListener: (
        callback: (
          message: any,
          sender: any,
          sendResponse: (response?: any) => void
        ) => boolean | void
      ) => void;
    };
    sendMessage: (
      message: any,
      callback?: (response: any) => void
    ) => void;
    openOptionsPage: () => void;
  };
  tabs: {
    query: (
      queryInfo: {
        active: boolean;
        currentWindow: boolean;
      },
      callback: (tabs: Array<{ url?: string; id?: number }>) => void
    ) => void;
    onUpdated: {
      addListener: (
        callback: (
          tabId: number,
          changeInfo: TabChangeInfo,
          tab: Tab
        ) => void
      ) => void;
    };
  };
  storage: {
    sync: {
      get: (keys: string | string[] | null, callback: (items: any) => void) => void;
      set: (items: any, callback?: () => void) => void;
    };
    local: {
      get: (keys: string | string[] | null, callback: (items: any) => void) => void;
      set: (items: any, callback?: () => void) => void;
    };
  };
}

declare const chrome: Chrome;
