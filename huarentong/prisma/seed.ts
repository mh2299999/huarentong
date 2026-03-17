import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("demo123456", 10);
  const user = await prisma.user.upsert({
    where: { email: "demo@huarentong.com" },
    update: {},
    create: {
      email: "demo@huarentong.com",
      password: hashedPassword,
      name: "张三",
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: "lisi@huarentong.com" },
    update: {},
    create: {
      email: "lisi@huarentong.com",
      password: hashedPassword,
      name: "李四",
    },
  });

  console.log("✅ Created demo users");

  // Seed news
  const newsItems = [
    {
      title: "纽约华人社区举办春节庆祝活动",
      summary: "法拉盛地区将举办大型春节花车游行和文化展览，预计吸引数万人参加",
      content: "纽约法拉盛地区将于本周末举办大型春节庆祝活动，包括花车游行、文化展览、传统美食节等。\n\n此次活动由当地华人社团联合举办，已经连续举办了30多年。今年的主题是\"龙腾四海\"，将有超过50个社区团体参与花车制作和表演。\n\n活动还将设有儿童互动区域，包括书法体验、剪纸艺术和中国结编织等传统文化项目。",
      category: "社区新闻",
      author: "华人通编辑部",
    },
    {
      title: "加州新法案影响华人小企业主",
      summary: "新最低工资法案将于下月生效，小企业主需要提前做好准备",
      content: "加利福尼亚州新的最低工资法案将于下月正式生效。新法案将最低工资提高至每小时16美元，对餐饮业和零售业的华人小企业主影响较大。\n\n多位华人商会代表表示，他们正在积极帮助会员了解新规定，并提供合规指导。\n\n建议小企业主及时咨询会计师或律师，确保按时合规。",
      category: "生活指南",
      author: "华人通编辑部",
    },
    {
      title: "华人学生在全美科学竞赛中获奖",
      summary: "多名华裔学生在Regeneron科学天才奖中斩获佳绩",
      content: "今年的Regeneron科学天才奖结果揭晓，多名华裔学生在比赛中取得优异成绩。\n\n来自新泽西州的王明辉同学凭借其在人工智能领域的研究获得一等奖，奖金高达25万美元。\n\n这些年轻学子的优秀表现再次展示了华人社区对教育的重视和在科学领域的卓越贡献。",
      category: "教育资讯",
      author: "华人通编辑部",
    },
    {
      title: "美国房贷利率下降，华人购房者关注",
      summary: "30年固定利率降至6.5%以下，多个华人聚居区房价趋稳",
      content: "美国房贷利率近期出现明显下降，30年固定利率已降至6.5%以下。这一变化引起了华人购房者的广泛关注。\n\n在传统华人聚居区如加州圣盖博谷、纽约法拉盛等地区，房价已趋于稳定。业内人士分析，这可能是入市的好时机。\n\n不过专家也提醒购房者，购房决策应综合考虑个人财务状况，不应仅凭利率变化做决定。",
      category: "社区新闻",
      author: "华人通编辑部",
    },
    {
      title: "H-1B签证新规解读：对华人申请者的影响",
      summary: "移民局发布H-1B签证改革方案，注册流程将有重大变化",
      content: "美国移民局（USCIS）近日发布了H-1B签证改革的最终规则。新规将对注册流程、受益人资格等方面进行重大调整。\n\n主要变化包括：实行受益人为单位的抽签制度、加强对关联公司重复注册的监管、调整cap-exempt的适用范围等。\n\n移民律师建议受影响的华人申请者尽早咨询专业人士，了解新规对自身情况的影响。",
      category: "移民政策",
      author: "华人通编辑部",
    },
    {
      title: "洛杉矶华人美食节即将开幕",
      summary: "汇集百家华人餐厅，展示中国各地美食文化",
      content: "第五届洛杉矶华人美食节将于本月底在圣盖博市举办。本次美食节将汇集超过100家华人餐厅，展示来自中国各省的特色美食。\n\n除了品尝美食，活动还将举办厨艺表演、美食摄影比赛等精彩活动。\n\n入场门票为每人15美元，12岁以下儿童免费。",
      category: "文化活动",
      author: "华人通编辑部",
    },
    {
      title: "绿卡排期最新进展：职业移民EB-2前进显著",
      summary: "国务院最新排期表显示，中国大陆出生EB-2类别大幅前进",
      content: "美国国务院公布了最新一期的签证排期表。对于中国大陆出生的申请者来说，EB-2类别的排期出现了显著前进。\n\n目前EB-2表A排期前进至2020年3月，表B前进至2020年9月。这意味着更多等待中的申请者可以提交I-485调整身份申请。\n\n移民律师提醒，排期随时可能出现变动，建议申请者密切关注并做好准备。",
      category: "移民政策",
      author: "华人通编辑部",
    },
  ];

  for (const item of newsItems) {
    await prisma.news.create({ data: item });
  }
  console.log(`✅ Created ${newsItems.length} news articles`);

  // Seed posts
  const posts = [
    {
      title: "法拉盛三房两卫公寓出租",
      content: "法拉盛中心地段，近7号线地铁站，步行5分钟可达。三房两卫，约1200平方英尺。\n\n设施齐全：洗衣机、烘干机、中央空调、暖气。\n\n租金包水费，不包电费和网费。可养小型宠物。即日起可看房。",
      category: "REAL_ESTATE",
      price: "$2,800/月",
      location: "纽约法拉盛",
      contactInfo: "微信: house_nyc, 电话: 718-555-0123",
      userId: user.id,
    },
    {
      title: "圣盖博 4房3卫独栋别墅出售",
      content: "优质学区房！位于圣盖博安静住宅区，4房3卫，2车位车库。\n\n2019年翻新，全新厨房和浴室。后院宽敞，带BBQ区域。\n\n近华人超市和各类中餐厅，生活极为便利。",
      category: "REAL_ESTATE",
      price: "$980,000",
      location: "洛杉矶圣盖博",
      contactInfo: "经纪人王小姐: 626-555-0456",
      userId: user2.id,
    },
    {
      title: "招聘中餐厅炒锅师傅",
      content: "位于曼哈顿的知名中餐厅招聘经验丰富的炒锅师傅。\n\n要求：5年以上中餐烹饪经验，擅长粤菜或川菜，有纽约工作许可。\n\n待遇：月薪$5,000-7,000（视经验而定），包工作餐，每周休息一天，有小费。",
      category: "JOBS",
      price: "$5,000-7,000/月",
      location: "纽约曼哈顿",
      contactInfo: "电话: 212-555-0456",
      userId: user.id,
    },
    {
      title: "硅谷科技公司招聘软件工程师",
      content: "知名科技公司招聘全栈软件工程师。\n\n要求：CS相关学位，3年以上工作经验，熟悉React/Node.js/Python，有H-1B或绿卡。\n\n福利：有竞争力的薪资+股票期权，医疗保险，401K匹配，免费午餐，弹性工作。",
      category: "JOBS",
      price: "$150K-200K/年",
      location: "加州硅谷",
      contactInfo: "投简历至 hr@techcompany.com",
      userId: user2.id,
    },
    {
      title: "iPhone 15 Pro Max 256GB 九成新转让",
      content: "因换新机，转让iPhone 15 Pro Max 256GB，原装深空黑色。\n\n使用不到半年，全程带壳贴膜，屏幕无划痕。电池健康度98%。\n\n配件齐全：原装充电线、说明书、包装盒。",
      category: "SECOND_HAND",
      price: "$850",
      location: "纽约",
      contactInfo: "微信: iphone_sale_ny",
      userId: user.id,
    },
    {
      title: "全套婴儿用品低价转让",
      content: "宝宝长大了，全套婴儿用品低价转让：\n\n- Uppababy Vista V2 婴儿推车 $300（原价$1000）\n- 4moms mamaRoo 摇篮 $80（原价$250）\n- Halo 婴儿床 $50\n- 大量0-12个月婴儿衣物 打包$50\n\n全部八成新以上，可单独购买也可打包优惠。",
      category: "SECOND_HAND",
      price: "打包$400",
      location: "新泽西",
      contactInfo: "电话: 201-555-0789",
      userId: user2.id,
    },
    {
      title: "EB-5投资移民项目咨询",
      content: "资深移民律师团队，专注EB-5投资移民15年。\n\n服务内容：\n- EB-5项目筛选和尽职调查\n- I-526E申请准备和提交\n- 绿卡面试辅导\n- 投资款退还跟踪\n\n已成功帮助500+家庭获得美国绿卡。免费初次咨询。",
      category: "IMMIGRATION",
      location: "全美服务",
      contactInfo: "预约电话: 212-555-0999, 微信: immigration_lawyer",
      userId: user.id,
    },
    {
      title: "NIW国家利益豁免绿卡申请经验分享",
      content: "本人STEM博士，去年成功通过NIW获得绿卡批准，分享一些经验。\n\n准备材料要点：推荐信（6封，其中3封独立推荐人），详细的研究计划，发表论文和引用记录。\n\n整个过程从提交到批准大约8个月。欢迎交流讨论。",
      category: "IMMIGRATION",
      location: "波士顿",
      contactInfo: "可私信交流",
      userId: user2.id,
    },
    {
      title: "周末户外徒步群招人",
      content: "我们是一群热爱户外运动的华人朋友，每周末组织纽约周边的徒步活动。\n\n最近计划：\n- Harriman State Park 环线\n- Bear Mountain 登顶\n- Hudson Valley 秋季赏红叶\n\n不限年龄和体能水平，有适合新手的路线。欢迎加入！",
      category: "SOCIAL",
      location: "纽约及周边",
      contactInfo: "入群请加微信: hiking_nyc_2024",
      userId: user.id,
    },
    {
      title: "湾区华人读书会招新成员",
      content: "湾区华人读书会成立3年，目前有30多位成员。每月聚会一次，讨论一本中文或英文书籍。\n\n本月书目：《三体》（英文版 The Three-Body Problem）\n\n我们的成员来自各行各业，聚会氛围轻松友好。除了读书讨论，也会组织聚餐和其他社交活动。",
      category: "SOCIAL",
      location: "加州湾区",
      contactInfo: "报名链接: meetup.com/bayarea-cn-book",
      userId: user2.id,
    },
    {
      title: "专业CPA报税服务 新客户8折",
      content: "持牌CPA提供专业报税服务，服务华人社区超过15年。\n\n服务项目：个人报税1040、小企业报税、ITIN申请、FBAR/FATCA海外资产申报。\n\n特别优惠：新客户首年报税享8折优惠。提供中英文服务，可预约远程办理。",
      category: "JOBS",
      location: "全美远程服务",
      contactInfo: "电话: 646-555-0789, 邮箱: cpa@example.com",
      userId: user.id,
    },
  ];

  for (const post of posts) {
    await prisma.post.create({ data: post });
  }
  console.log(`✅ Created ${posts.length} sample posts`);

  console.log("\n🎉 Seed completed!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
