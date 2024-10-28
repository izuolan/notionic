const BLOG = {
  title: '810C', // 博客的标题
  author: 'FuHeng', // 博主的名字
  email: '2827162018@qq.com', // 博主的电子邮件
  link: 'https://810C.cn', // 博客链接
  newsletter: 'Notionic Weekly', // 新闻订阅的名称
  description: 'FuHeng的个人博客', // 博客的描述
  lang: 'zh-CN', // 博客语言，支持多种语言
  timezone: 'Asia/Shanghai', // 时区设置
  appearance: 'auto', // 外观模式，支持亮色、暗色和自动模式
  font: 'sans-serif', // 字体类型，可选择无衬线或有衬线字体
  lightBackground: '#F6F8FA', // 亮色背景的十六进制颜色值
  darkBackground: '#212936', // 暗色背景的十六进制颜色值
  path: '', // 部署时的路径，默认为空即根路径
  since: 2022, // 博客开始年份，如果留空则使用当前年份
  postsPerPage: 10, // 每页显示的文章数量
  sortByDate: true, // 是否按日期排序
  pagesShow: { // 控制哪些页面显示
    newsletter: true,
    notes: true,
    projects: true,
    contact: true,
    books: true,
    friends: true
  },
  showWeChatPay: true, // 是否显示微信支付选项
  previewImagesEnabled: true, // 是否启用预览图像
  autoCollapsedNavBar: false, // 导航栏是否自动折叠
  ogImageGenerateHost: 'og-zl.vercel.app', // 生成OG图像的链接
  defaultCover: '/cover.jpg', // 默认封面图片路径
  socialLink: { // 社交媒体链接
    twitter: '', // Twitter链接
    github: '', // GitHub链接
    telegram: '' // Telegram链接
  },
  seo: { // SEO设置
    keywords: ['Notionic', 'Zuolan', 'Blog'], // 关键词
    googleSiteVerification: '' // Google站点验证代码
  },
  notionPageId: process.env.NOTION_PAGE_ID, // Notion页面ID，需在.env文件中设置
  notionSpacesId: process.env.NOTION_SPACES_ID, // Notion空间ID，需在.env文件中设置
  notionAccessToken: process.env.NOTION_ACCESS_TOKEN, // Notion访问令牌，用于私有数据库
  notionDomain: 'fuheng-blog.notion.site', // Notion域名
  telegramChannelUrl: 'https://channel.zuolan.me/', // Telegram频道链接
  telegramChannelName: 'zuolan_me', // Telegram频道名称
  craftConfigShareUrl: 'https://www.craft.do/s/kQtcWqkv98cHhB', // Craft配置分享链接
  analytics: { // 分析设置
    provider: '', // 可选分析提供者: Google Analytics, Ackee, Umami, Cloudflare Insights
    ackeeConfig: { // Ackee配置
      tracker: '', // Ackee跟踪器URL
      dataAckeeServer: '', // Ackee数据服务器URL
      domainId: '' // Ackee域ID
    },
    cfConfig: { // Cloudflare配置
      scriptUrl: 'https://static.cloudflareinsights.com/beacon.min.js', // Cloudflare默认跟踪脚本
      token: '' // Cloudflare令牌
    },
    gaConfig: { // Google Analytics配置
      measurementId: '' // Google测量ID
    },
    umamiConfig: { // Umami配置
      scriptUrl: '', // Umami脚本URL
      websiteId: '' // Umami网站ID
    }
  },
  comment: { // 评论设置
    provider: '', // 支持的评论提供者，可以为空
    supaCommentsConfig: { // SupaComments配置
      supabaseUrl: '', // Supabase实例URL
      supabaseAnonKey: '' // Supabase匿名密钥
    },
    utterancesConfig: { // Utterances配置
      repo: '' // GitHub仓库
    }
  },
  isProd: process.env.VERCEL_ENV === 'production' // 判断是否为生产环境
}
// export default BLOG
module.exports = BLOG // 导出博客配置
