# NutriAudit 标签工具公开包：准入决策报告

## 范围与事实

用户已批准将八项标签整理工具隔离开源，配备说明并引导进入 NutriAudit 核心审计。拟公开内容为自主实现的纯函数、共享结果文案、静态演示与合成示例；不含商业应用、药物数据库、模型提示、账号、支付、真实健康资料或分析 SDK。公开包 MIT；不复制以下候选代码或数据。八项实现已有本地检查及独立反例验收，不能据此声称外部采用、引流或医学可靠。

反方审查补查了两个更强离线候选并纠正原比较，详见下列六项目。未把原定build当成必然结论。

两类使用任务：新增补充剂前比较候选标签；梳理现有产品及实际用量。离线嵌入与源码审阅是公开包需求，外部开发者需求规模未知。官方背景：[FDA 标签份数与数量口径](https://www.fda.gov/food/dietary-supplements-guidance-documents-regulatory-information/dietary-supplement-labeling-guide-chapter-iv-nutrition-labeling)、[NIH 记录与医护沟通](https://ods.od.nih.gov/factsheets/WYNTK-Consumer/)、[NIH DSLD](https://ods.od.nih.gov/Research/Dietary_Supplement_Label_Database/)。不把标签数量算术当个人风险判断。

## 已核对候选

- https://github.com/josdejong/mathjs ：直接覆盖单位算术子问题。官方单位文档支持质量转换和维度；整体库引入依赖，Apache-2.0 主许可并含另许可组件。默认分支提交与最新推送是不同指标，快照分别保留；无 latest-release 并不证明未发行。未确认完整八项标签工作流，不断言代码没有。只参考单位边界。
- https://github.com/wger-project/wger ：相邻营养记录、饮食计划及多用户应用，有完整部署需求。仓库 API 许可标识 AGPL-3.0，维护者说明应用 AGPL-3.0-or-later，数据/文档另外处理。未证实为无依赖标签函数包；参考记录结构，不复制实现。
- https://github.com/nutritionix/nutrition-label ：MIT 的 jQuery 标签展示插件。输入数据生成标签与标签比较不同，原样有第三方前端依赖。快照显示默认分支提交/发行在2023年、最近推送在2024年，机器状态按校验器为inactive；不能据此断言项目弃用，不以较新的 star 更新时间代替代码活动。仅参考展示；同组织 API 客户端需凭据，不能把代码开源等同服务免费。
- https://github.com/hunterthompson025/SupplementTracker ：本次搜索新发现的直接相邻库存方案。README描述家庭库存、用量消耗和补货；静态 ES module 外加 Firebase 身份/数据库同步，依赖账号及在线服务，与零网络演示条件不同。它可优于本包的长期家庭同步，本包不取代这一工作流。只参考；其质量与真实采用未知。

- https://github.com/McJack3d/PJT_kleerer.io ：独立反方补查的更强直接候选。维护者文档说明静态无运行依赖、离线目录、补充剂比较及叠加总量；不能再以账号/部署负担作为排除理由。它面向EU/法国产品目录、个人目标与临床/成分评分，有数据维护/评分管线；软件AGPL-3.0-only、方法CC BY-NC-ND、数据CC BY-NC-SA及数据库权利，不能把目录套用MIT。本次只参考，不复制代码、数据或方法评分；是否能抽取全部纯算术API未实测，不断言不能。来源https://github.com/McJack3d/PJT_kleerer.io/blob/main/NOTICE.md 。
- https://github.com/ilodezis/stack ：离线静态PWA日常追踪、补充剂库存与本地导出；无服务器/账号、localStorage保留数据。不能以部署/在线依赖排除。它解决持久提醒/消耗工作流，本包以瞬时手录标签计算和可嵌入函数为范围，不取代提醒。GitHub API许可UNKNOWN，未确认可复用许可；README描述不能替代正式许可授权。只参考、不复制。

候选当前 commit、日期、是否 archived、许可和 stars/forks 以同目录官方收集器快照为准。星数不是采用、质量或商业适配证据；六项实际采用均未知。未完成完整依赖/漏洞审计，六项安全均未知。没有将未知许可或未做安全审计写成通过审计。

## 替代比较与决定

个人记录和算术可以用[电子表格 CONVERT](https://support.microsoft.com/en-us/excel/functions/convert-function)＋[NIH记录表](https://ods.od.nih.gov/HealthInformation/healthinformation.aspx)完成；[Pint](https://pint.readthedocs.io/en/stable/getting/overview.html)也覆盖单位算术，Python运行时不直接满足浏览器嵌入。仅在商业站发布可减少第二套发行维护，仍是充分替代，若公开复用没人需要，后续不扩大包。

决定 build：发布已存在实现的最小隔离包，而非重建计算库或完整应用。增量是同一标签输入契约、缺量传播、份/粒校验、仅 g/mg/mcg 同对象转换、四组明确来源名称边界、本地 CSV/打印和每项结果旁核心审计入口。八项组合不是已证明的创新，不声称市场上没有完整替代品。

相较集成通用单位库或 fork 完整应用，当前纯函数已经完成必要算术，新增依赖、账号或部署不能减少这次最小交付范围。更强的两个离线候选证明“零依赖、离线”本身没有独占差异：kleerer的比较/总量真实重合，不排除其可复用基础；但抽离AGPL代码及受限目录须另行评估且不能直接授予MIT。stack的持久追踪有真实价值，许可UNKNOWN不能直接fork。此次最小公开交付复用既有自有实现，保留明确输入契约、瞬时无持久数据和函数嵌入范围；不能声称这必然比候选更好。若用户实际要长期库存或已有目录评分，应先考虑上述候选，不扩本包。公开包沿用商业站同一来源生成，修复/版本记录公开；维护负担限定一个包、八个示例，不开八个重复仓。只在准入及公开文件独立审核通过后创建正式目录和远端。

## 风险、反证与后续验收

公开安全：输入保留页面内，关闭后丢失；站点跳转仅固定任务/渠道归因，无标签正文，不承诺开源演示跨域带入。未知不归零、IU/%DV/体积拒绝转换、D2/D3保持区分、盐质量不推元素量。重名与合计不是冲突/安全结论，核心审计免费预览/付费全文边界明确。

没有真实访谈、搜索规模、复用量或转化数据。老社区自述只能证实个别手录流程。若真实用户输入完成率低、公开包无复用或入口没有有效到站，则修正入口或收敛维护；不能用发布/索引/Star代替业务成功。开发者若需要家庭同步，已有SupplementTracker更贴合；若只需个人算术，表格更简单。

发布验收：独立核对来源哈希、许可证、敏感扫描、英文默认、中英八项、未知/非法输入、下载失败/打印、核心链接与无外传；首次commit保留准入证据。主站发布独立遵守受控部署和线上正式域名回读。Google/Bing提交受理与索引、点击分别报告。此报告是研究决定，独立审核与最终manifest校验尚未写入时不得当准入通过。

## 采集完整性

官方采集器 urllib 响应多次截断，采用暂存目录临时 curl --compressed HTTP 传输适配，TLS 正常验证，同 Request URL/headers，无认证。未改官方解析、裁剪、时间、写文件和校验逻辑。传输收据保存官方脚本/适配器 SHA、请求 URL/状态及解压响应 SHA。独立审核须核对后确认，不以手写内容填充 API 快照。

机器维护状态依据公开快照的时间规则：nutrition-label=inactive、SupplementTracker=active、stack=active。它们不是实际维护承诺、质量或未来支持的证明；上述未知判断保留。
