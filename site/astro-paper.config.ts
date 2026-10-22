import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://2008ccy.github.io/",
    title: "ccy｜个人网站",
    description: "ccy 的个人网站：学习记录、作品与联系信息。",
    author: "ccy",
    profile: "https://github.com/2008ccy",
    ogImage: "default-og.png",
    lang: "zh-CN",
    timezone: "Asia/Shanghai",
    dir: "ltr",
  },
  posts: {
    perPage: 4,
    perIndex: 4,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    dynamicOgImage: false,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: true,
      url: "https://github.com/2008ccy/2008ccy.github.io/edit/main/",
    },
    search: "pagefind",
  },
  socials: [
    { name: "github", url: "https://github.com/2008ccy" },
  ],
  shareLinks: [
    { name: "mail", url: "mailto:?subject=分享文章&body=" },
  ],
});
