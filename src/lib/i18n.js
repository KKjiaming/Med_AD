export const languageOptions = [
  { code: 'en', label: 'English' },
  { code: 'zh', label: '中文' },
  { code: 'sv', label: 'Svenska' },
];

const translations = {
  en: {
    appTitle: 'Multidimensional Predictive Model for Alzheimer’s Disease',
    appDescription:
      'This project uses biological stage with clinical, blood, and imaging indicators to predict current Alzheimer’s disease stage and future progression risk.',
    workflowKicker: 'Interpretable model route',
    workflowTitle: 'Regression-first development, not black-box prediction',
    workflowDescription:
      'The prototype highlights an explanatory modeling pipeline: ordered Logistic regression is used as the statistical backbone, then three independent variable-selection routes are compared before building progressive score models.',
    workflowCompactKicker: 'Model route',
    workflowCompactTitle: 'How this score was built',
    workflowCompactDescription:
      'The result summarizes an interpretable route: ordered Logistic regression as the backbone, with three variable-selection routes used before score construction.',
    workflowBackbone: 'Backbone',
    workflowRouteLabel: 'Model development route',
    selectionKicker: 'Selection routes',
    selectionTitle: 'Variable selection routes are summarized for display',
    workflow: {
      route: {
        describe: {
          title: 'Descriptive analysis',
          text: 'Clean variables, inspect distributions, and define clinical stage groups.',
        },
        ordinal: {
          title: 'Ordered Logistic regression',
          text: 'Run univariate and multivariable ordinal models for current clinical stage.',
        },
        collinearity: {
          title: 'Collinearity check',
          text: 'Reduce unstable overlap before final variable screening.',
        },
      },
      methods: {
        randomForest: {
          title: 'Random forest',
          text: 'Captures nonlinear signals while ranking relevant variables.',
        },
        methodB: {
          title: 'XX XX',
          text: 'Additional masked variable-selection route.',
        },
        methodC: {
          title: 'XX XX',
          text: 'Additional masked variable-selection route.',
        },
      },
      scores: {
        score0: 'Biological stage only',
        score1: 'Variables selected by all three methods',
        score2: 'Variables selected by at least two methods',
        score3: 'Variables selected by at least one method',
      },
    },
    language: 'Language',
    mainModelLayer: 'Main model layer',
    chooseModel: 'Choose a scoring model',
    inputLayer: 'Input layer',
    variables: 'variables',
    additionalFactorsTitle: 'Other potential factors',
    additionalFactorsText:
      'The displayed variables are the current model inputs; other clinical, biological, imaging, lifestyle, and treatment-related factors may also matter.',
    predictButton: 'Predict Clinical Stage',
    predictingButton: 'Predicting...',
    predictingKicker: 'Model running',
    predictingTitle: 'Analyzing multidimensional profile',
    predictingText:
      'Standardizing inputs, applying the prototype score, and assembling the clinical stage output.',
    predictingStep1: 'Clinical and biological stage',
    predictingStep2: 'System contribution scan',
    predictingStep3: 'Stage probability profile',
    scoringModel: 'Scoring model',
    predictionLayer: 'Prediction layer',
    currentClinicalStage: 'Current Clinical Stage',
    predictedStage: 'Predicted stage',
    prototypeScore: 'Prototype score',
    scaledScore: '0-100 scaled score',
    model: 'Model',
    variablesUsed: 'Variables used',
    trainingAuc: '{auc} training AUC',
    stageProbabilityProfile: 'Stage probability profile',
    stageLabel: 'Stage {stage}',
    explanationLayer: 'Explanation layer',
    systemContribution: 'System contribution',
    topVariables: 'Top variables',
    largestScoreDrivers: 'Largest score drivers',
    modelDevelopmentEvidence: 'Model development evidence',
    trainingPerformance: 'Training performance',
    modelColumn: 'Model',
    variablesColumn: 'Variables',
    externalValidation: 'External validation',
    multicenterCases: '{count} multicenter cases',
    externalValidationSummary:
      'score3 OR {or}, AUC {auc}, C-index {cIndex}.',
    externalValidationNote:
      'External validation supports the model direction and risk gradient, but should be interpreted as preliminary because of missing variables and imbalanced clinical stages.',
    exploratoryLongitudinalSignal: 'Exploratory longitudinal signal',
    longitudinalCohort: 'Stage 3-4 AD subgroup',
    longitudinalOutcome: 'Clinical stage progression',
    longitudinalSummary: '{outcome}: AUC {auc}, OR {or}, P = {pValue}.',
    longitudinalNote:
      'This is a supplemental signal, not the primary model objective.',
    interpretationLabel: 'Interpretation',
    prototypeNoteLabel: 'Prototype note',
    prototypeNote:
      'Prototype scoring is for interface design only. Replace placeholder weights with the final ordinal logistic model coefficients before clinical or research use.',
    footerLine1: 'Research prototype for Alzheimer’s disease clinical staging',
    footerLine2: 'For model visualization and study communication only.',
    footerLine3:
      '© 2026 KKjiaming. All rights reserved. No copying, redistribution, derivative work, commercial use, or clinical use without written permission.',
    validation: {
      invalidModel: 'Please select a valid model.',
      invalidSelect: 'Please select a valid {field}.',
      range: '{field} must be between {min}-{max}{unit}.',
    },
    groupTitles: {
      stage: 'Staging and demographics',
      csvd: 'Cerebral small vessel disease',
      coagulation: 'Coagulation',
      metabolic: 'Metabolic, renal, and cardiovascular',
      immune: 'Inflammation, immune, and tumor markers',
    },
    systemLabels: {
      stage: 'Staging / Demographics',
      csvd: 'Cerebral small vessel disease',
      coagulation: 'Coagulation',
      metabolic: 'Metabolic / Renal / Cardiovascular',
      immune: 'Inflammation / Immune / Tumor markers',
    },
    modelTitles: {
      score0: 'Biological stage only',
      score1: 'Variables selected by all three methods',
      score2: 'Variables selected by at least two methods',
      score3: 'Variables selected by at least one method',
    },
    fieldLabels: {
      biologicalStage: 'Baseline biological stage',
      age: 'Age',
      educationYears: 'Education',
      BMI: 'BMI',
      PWMH: 'PWMH',
      DWMH: 'DWMH',
      totalCMB: 'Total CMB',
      D_dimer: 'D-dimer',
      ATIII: 'ATIII',
      Fbg: 'Fbg',
      FDP: 'FDP',
      TT: 'TT',
      APTT: 'APTT',
      LDL_C: 'LDL-C',
      LDH: 'LDH',
      Crea: 'Creatinine',
      NLR: 'NLR',
      IgL: 'Ig lambda',
      CA72_4: 'CA72-4',
    },
    fieldNotes: {
      biologicalStage: 'AD biological stage based on baseline pathology profile',
      age: 'Patient age at baseline assessment',
      educationYears: 'Total years of formal education',
      BMI: 'Body mass index',
      PWMH: 'Periventricular white matter hyperintensity',
      DWMH: 'Deep white matter hyperintensity',
      totalCMB: 'Total cerebral microbleeds',
      D_dimer: 'Fibrin degradation marker reflecting coagulation and fibrinolysis activation',
      ATIII: 'Antithrombin III, an endogenous anticoagulant activity marker',
      Fbg: 'Fibrinogen, a coagulation substrate and inflammation-related protein',
      FDP: 'Fibrin/fibrinogen degradation products reflecting fibrinolysis',
      TT: 'Thrombin time, reflecting conversion from fibrinogen to fibrin',
      APTT: 'Activated partial thromboplastin time for intrinsic/common coagulation pathways',
      LDL_C: 'Low-density lipoprotein cholesterol',
      LDH: 'Lactate dehydrogenase, a tissue injury and metabolism-related enzyme',
      Crea: 'Serum creatinine, a renal function marker',
      NLR: 'Neutrophil-to-lymphocyte ratio, a systemic inflammation marker',
      IgL: 'Immunoglobulin lambda light chain, an immune-related marker',
      CA72_4: 'Carbohydrate antigen 72-4, a tumor-associated serum marker',
    },
    interpretation: {
      '0-2': {
        level: 'Predicted clinical stage 0-2',
        text:
          'The current multidimensional profile is closer to the earliest clinical stage group.',
        advice:
          'Review biological stage consistency, cognitive testing, and longitudinal monitoring plan.',
      },
      '3-4': {
        level: 'Predicted clinical stage 3-4',
        text:
          'The current multidimensional profile is most compatible with an intermediate clinical stage.',
        advice:
          'This subgroup is also the most relevant population for exploratory progression-risk review.',
      },
      '5': {
        level: 'Predicted clinical stage 5',
        text:
          'The current profile suggests a more advanced clinical burden than early-stage disease.',
        advice:
          'Inspect system-level contributions and confirm whether vascular, coagulation, metabolic, or inflammatory factors are driving the score.',
      },
      '6': {
        level: 'Predicted clinical stage 6',
        text:
          'The current profile is closest to the most advanced clinical stage group in this prototype.',
        advice:
          'Use this output as an explanatory research signal and verify against clinical assessment.',
      },
    },
  },
  zh: {
    appTitle: '阿尔茨海默病多维预测模型',
    appDescription:
      '本项目结合生物学分期与临床、血液、影像指标，用于预测阿尔茨海默病患者当前临床分期及未来进展风险。',
    workflowKicker: '解释型建模路线',
    workflowTitle: '以回归建模为主线，而不是黑箱预测',
    workflowDescription:
      '该原型突出稳妥的解释型流程：以有序 Logistic 回归作为统计主线，再并列比较三种变量筛选路径，最后形成递进式评分模型。',
    workflowCompactKicker: '模型路线',
    workflowCompactTitle: '该评分如何构建',
    workflowCompactDescription:
      '结果区仅简要呈现解释型路线：以有序 Logistic 回归为主线，并结合三种变量筛选路径形成评分。',
    workflowBackbone: '统计主线',
    workflowRouteLabel: '模型开发路线',
    selectionKicker: '筛选路径',
    selectionTitle: '通过匿名筛选路径形成变量集',
    workflow: {
      route: {
        describe: {
          title: '描述性分析',
          text: '完成变量清洗、分布检查和临床分期整理。',
        },
        ordinal: {
          title: '有序 Logistic 回归',
          text: '围绕当前临床分期进行单因素和多因素有序回归。',
        },
        collinearity: {
          title: '共线性检查',
          text: '在正式筛选前减少变量重叠和不稳定估计。',
        },
      },
      methods: {
        randomForest: {
          title: '随机森林',
          text: '捕捉非线性和交互信息，并对相关变量进行排序。',
        },
        methodB: {
          title: 'XX XX',
          text: '另一条已匿名处理的变量筛选路径。',
        },
        methodC: {
          title: 'XX XX',
          text: '另一条已匿名处理的变量筛选路径。',
        },
      },
      scores: {
        score0: '仅含生物学分期',
        score1: '纳入三法均筛中的变量',
        score2: '纳入至少两种方法入选的变量',
        score3: '纳入任一方法入选的变量',
      },
    },
    language: '语言',
    mainModelLayer: '主模型层',
    chooseModel: '选择评分模型',
    inputLayer: '输入层',
    variables: '个变量',
    additionalFactorsTitle: '其他潜在因素',
    additionalFactorsText:
      '当前展示的是模型已纳入变量；临床、生物学、影像、生活方式和治疗相关因素仍可能产生影响。',
    predictButton: '预测临床分期',
    predictingButton: '预测中...',
    predictingKicker: '模型运行中',
    predictingTitle: '正在分析多维度特征',
    predictingText:
      '正在标准化输入、应用原型评分，并生成临床分期预测结果。',
    predictingStep1: '临床与生物学分期',
    predictingStep2: '系统贡献扫描',
    predictingStep3: '分期概率分布',
    scoringModel: '评分模型',
    predictionLayer: '预测层',
    currentClinicalStage: '当前临床分期',
    predictedStage: '预测分期',
    prototypeScore: '原型评分',
    scaledScore: '0-100 标准化评分',
    model: '模型',
    variablesUsed: '使用变量数',
    trainingAuc: '训练集 AUC {auc}',
    stageProbabilityProfile: '分期概率分布',
    stageLabel: '{stage} 期',
    explanationLayer: '解释层',
    systemContribution: '系统贡献',
    topVariables: '主要变量',
    largestScoreDrivers: '评分主要驱动因素',
    modelDevelopmentEvidence: '模型开发证据',
    trainingPerformance: '训练集表现',
    modelColumn: '模型',
    variablesColumn: '变量数',
    externalValidation: '外部验证',
    multicenterCases: '{count} 例多中心样本',
    externalValidationSummary:
      'score3 OR {or}，AUC {auc}，C-index {cIndex}。',
    externalValidationNote:
      '外部验证支持模型方向和风险梯度，但由于变量缺失和临床分期分布不均衡，应作为初步验证谨慎解读。',
    exploratoryLongitudinalSignal: '探索性纵向信号',
    longitudinalCohort: '3-4 期 AD 亚组',
    longitudinalOutcome: '临床分期进展',
    longitudinalSummary: '{outcome}：AUC {auc}，OR {or}，P = {pValue}。',
    longitudinalNote: '这是补充性信号，不是主模型训练目标。',
    interpretationLabel: '解释',
    prototypeNoteLabel: '原型说明',
    prototypeNote:
      '当前评分仅用于界面原型设计。用于临床或研究前，应将占位权重替换为最终有序 Logistic 模型系数。',
    footerLine1: '阿尔茨海默病临床分期研究原型',
    footerLine2: '仅用于模型可视化和研究汇报。',
    footerLine3:
      '© 2026 KKjiaming。保留所有权利。未经书面许可，不得复制、转载、改编、商用或用于临床用途。',
    validation: {
      invalidModel: '请选择有效模型。',
      invalidSelect: '请选择有效的{field}。',
      range: '{field}必须在 {min}-{max}{unit} 范围内。',
    },
    groupTitles: {
      stage: '分期与人口学',
      csvd: '脑小血管病',
      coagulation: '凝血系统',
      metabolic: '代谢、肾功能与心血管',
      immune: '炎症、免疫与肿瘤标志物',
    },
    systemLabels: {
      stage: '分期 / 人口学',
      csvd: '脑小血管病',
      coagulation: '凝血系统',
      metabolic: '代谢 / 肾功能 / 心血管',
      immune: '炎症 / 免疫 / 肿瘤标志物',
    },
    modelTitles: {
      score0: '仅生物学分期',
      score1: '三种方法均入选变量',
      score2: '至少两种方法入选变量',
      score3: '任一方法入选变量',
    },
    fieldLabels: {
      biologicalStage: '基线生物学分期',
      age: '年龄',
      educationYears: '受教育年限',
      BMI: 'BMI',
      PWMH: 'PWMH',
      DWMH: 'DWMH',
      totalCMB: '总 CMB',
      D_dimer: 'D-dimer',
      ATIII: 'ATIII',
      Fbg: 'Fbg',
      FDP: 'FDP',
      TT: 'TT',
      APTT: 'APTT',
      LDL_C: 'LDL-C',
      LDH: 'LDH',
      Crea: '肌酐',
      NLR: 'NLR',
      IgL: 'Ig λ',
      CA72_4: 'CA72-4',
    },
    fieldNotes: {
      biologicalStage: '基于基线病理特征整理的 AD 生物学分期',
      age: '患者基线评估时年龄',
      educationYears: '正规教育累计年限',
      BMI: '体重指数',
      PWMH: '脑室旁白质高信号',
      DWMH: '深部白质高信号',
      totalCMB: '脑微出血总数',
      D_dimer: 'D-二聚体，反映凝血和纤溶活化',
      ATIII: '抗凝血酶 III，内源性抗凝活性指标',
      Fbg: '纤维蛋白原，凝血底物及炎症相关蛋白',
      FDP: '纤维蛋白/纤维蛋白原降解产物，反映纤溶状态',
      TT: '凝血酶时间，反映纤维蛋白原向纤维蛋白转化',
      APTT: '活化部分凝血活酶时间，反映内源性/共同凝血通路',
      LDL_C: '低密度脂蛋白胆固醇',
      LDH: '乳酸脱氢酶，组织损伤和代谢相关酶',
      Crea: '血清肌酐，肾功能指标',
      NLR: '中性粒细胞/淋巴细胞比值，系统性炎症指标',
      IgL: '免疫球蛋白 λ 轻链，免疫相关指标',
      CA72_4: '糖类抗原 72-4，肿瘤相关血清标志物',
    },
    interpretation: {
      '0-2': {
        level: '预测临床分期 0-2',
        text: '当前多维度特征更接近最早期临床分期组。',
        advice: '建议复核生物学分期一致性、认知测评和纵向随访计划。',
      },
      '3-4': {
        level: '预测临床分期 3-4',
        text: '当前多维度特征最符合中期临床分期。',
        advice: '该亚组也最适合进一步查看探索性的未来进展风险。',
      },
      '5': {
        level: '预测临床分期 5',
        text: '当前特征提示临床负担较早期疾病更重。',
        advice:
          '建议查看系统贡献，确认是否由血管、凝血、代谢或炎症因素驱动。',
      },
      '6': {
        level: '预测临床分期 6',
        text: '当前特征最接近本原型中的最高临床分期组。',
        advice: '请将该结果作为解释型研究信号，并结合临床评估复核。',
      },
    },
  },
  sv: {
    appTitle: 'Multidimensionell prediktiv modell för Alzheimers sjukdom',
    appDescription:
      'Projektet använder biologisk stadieindelning tillsammans med kliniska, blodbaserade och bildrelaterade indikatorer för att förutsäga aktuellt stadium vid Alzheimers sjukdom och framtida progressionsrisk.',
    workflowKicker: 'Tolkningsbar modellväg',
    workflowTitle: 'Regressionsdriven utveckling, inte svart låda',
    workflowDescription:
      'Prototypen lyfter fram en förklarande modellkedja: ordinal logistisk regression är den statistiska ryggraden, tre oberoende urvalsmetoder jämförs och därefter byggs progressiva poängmodeller.',
    workflowCompactKicker: 'Modellväg',
    workflowCompactTitle: 'Hur poängen byggdes',
    workflowCompactDescription:
      'Resultatet sammanfattar en tolkningsbar väg: ordinal logistisk regression som ryggrad, med tre urvalsvägar före poängkonstruktion.',
    workflowBackbone: 'Ryggrad',
    workflowRouteLabel: 'Modellutvecklingsväg',
    selectionKicker: 'Urvalsvägar',
    selectionTitle: 'Variabelurvalsvägar sammanfattas för visning',
    workflow: {
      route: {
        describe: {
          title: 'Deskriptiv analys',
          text: 'Rensa variabler, granska fördelningar och definiera kliniska stadiegrupper.',
        },
        ordinal: {
          title: 'Ordinal logistisk regression',
          text: 'Kör univariata och multivariata ordinala modeller för aktuellt kliniskt stadium.',
        },
        collinearity: {
          title: 'Kollinearitetskontroll',
          text: 'Minska instabil överlappning före slutligt variabelurval.',
        },
      },
      methods: {
        randomForest: {
          title: 'Random forest',
          text: 'Fångar icke-linjära signaler och interaktioner samtidigt som relevanta variabler rangordnas.',
        },
        methodB: {
          title: 'XX XX',
          text: 'Ytterligare maskerad variabelurvalsväg.',
        },
        methodC: {
          title: 'XX XX',
          text: 'Ytterligare maskerad variabelurvalsväg.',
        },
      },
      scores: {
        score0: 'Endast biologiskt stadium',
        score1: 'Variabler valda av alla tre metoder',
        score2: 'Variabler valda av minst två metoder',
        score3: 'Variabler valda av minst en metod',
      },
    },
    language: 'Språk',
    mainModelLayer: 'Huvudmodell',
    chooseModel: 'Välj poängmodell',
    inputLayer: 'Inmatning',
    variables: 'variabler',
    additionalFactorsTitle: 'Andra möjliga faktorer',
    additionalFactorsText:
      'Variablerna som visas är aktuella modellindata; andra kliniska, biologiska, bildrelaterade, livsstils- och behandlingsfaktorer kan också ha betydelse.',
    predictButton: 'Förutsäg kliniskt stadium',
    predictingButton: 'Förutsäger...',
    predictingKicker: 'Modellen körs',
    predictingTitle: 'Analyserar multidimensionell profil',
    predictingText:
      'Standardiserar indata, tillämpar prototyppoängen och sammanställer kliniskt stadium.',
    predictingStep1: 'Kliniskt och biologiskt stadium',
    predictingStep2: 'Skanning av systembidrag',
    predictingStep3: 'Sannolikhetsprofil för stadium',
    scoringModel: 'Poängmodell',
    predictionLayer: 'Prediktionslager',
    currentClinicalStage: 'Aktuellt kliniskt stadium',
    predictedStage: 'Predikterat stadium',
    prototypeScore: 'Prototyppoäng',
    scaledScore: '0-100 skalad poäng',
    model: 'Modell',
    variablesUsed: 'Använda variabler',
    trainingAuc: '{auc} tränings-AUC',
    stageProbabilityProfile: 'Sannolikhetsprofil för stadium',
    stageLabel: 'Stadium {stage}',
    explanationLayer: 'Förklaringslager',
    systemContribution: 'Systembidrag',
    topVariables: 'Viktigaste variabler',
    largestScoreDrivers: 'Största poängdrivare',
    modelDevelopmentEvidence: 'Evidens från modellutveckling',
    trainingPerformance: 'Prestanda i träningsdata',
    modelColumn: 'Modell',
    variablesColumn: 'Variabler',
    externalValidation: 'Extern validering',
    multicenterCases: '{count} multicenterfall',
    externalValidationSummary:
      'score3 OR {or}, AUC {auc}, C-index {cIndex}.',
    externalValidationNote:
      'Extern validering stödjer modellens riktning och riskgradient, men bör tolkas som preliminär på grund av saknade variabler och obalanserade kliniska stadier.',
    exploratoryLongitudinalSignal: 'Explorativ longitudinell signal',
    longitudinalCohort: 'AD-undergrupp i stadium 3-4',
    longitudinalOutcome: 'Progression av kliniskt stadium',
    longitudinalSummary: '{outcome}: AUC {auc}, OR {or}, P = {pValue}.',
    longitudinalNote:
      'Detta är en kompletterande signal, inte modellens primära mål.',
    interpretationLabel: 'Tolkning',
    prototypeNoteLabel: 'Prototypnotering',
    prototypeNote:
      'Prototyppoängen är endast avsedd för gränssnittsdesign. Ersätt platshållarvikter med slutliga ordinala logistiska modellkoefficienter före klinisk användning eller forskningsanvändning.',
    footerLine1: 'Forskningsprototyp för klinisk stadieindelning vid Alzheimers sjukdom',
    footerLine2: 'Endast för modellvisualisering och forskningskommunikation.',
    footerLine3:
      '© 2026 KKjiaming. Alla rättigheter förbehållna. Ingen kopiering, vidarepublicering, bearbetning, kommersiell användning eller klinisk användning utan skriftligt tillstånd.',
    validation: {
      invalidModel: 'Välj en giltig modell.',
      invalidSelect: 'Välj ett giltigt värde för {field}.',
      range: '{field} måste vara mellan {min}-{max}{unit}.',
    },
    groupTitles: {
      stage: 'Stadieindelning och demografi',
      csvd: 'Cerebral småkärlssjukdom',
      coagulation: 'Koagulation',
      metabolic: 'Metabolism, njurfunktion och kardiovaskulärt',
      immune: 'Inflammation, immunitet och tumörmarkörer',
    },
    systemLabels: {
      stage: 'Stadieindelning / demografi',
      csvd: 'Cerebral småkärlssjukdom',
      coagulation: 'Koagulation',
      metabolic: 'Metabolism / njure / kardiovaskulärt',
      immune: 'Inflammation / immunitet / tumörmarkörer',
    },
    modelTitles: {
      score0: 'Endast biologiskt stadium',
      score1: 'Variabler valda av alla tre metoder',
      score2: 'Variabler valda av minst två metoder',
      score3: 'Variabler valda av minst en metod',
    },
    fieldLabels: {
      biologicalStage: 'Biologiskt stadium vid baslinjen',
      age: 'Ålder',
      educationYears: 'Utbildningsår',
      BMI: 'BMI',
      PWMH: 'PWMH',
      DWMH: 'DWMH',
      totalCMB: 'Totalt CMB',
      D_dimer: 'D-dimer',
      ATIII: 'ATIII',
      Fbg: 'Fbg',
      FDP: 'FDP',
      TT: 'TT',
      APTT: 'APTT',
      LDL_C: 'LDL-C',
      LDH: 'LDH',
      Crea: 'Kreatinin',
      NLR: 'NLR',
      IgL: 'Ig lambda',
      CA72_4: 'CA72-4',
    },
    fieldNotes: {
      biologicalStage: 'AD-biologiskt stadium baserat på patologiprofil vid baslinjen',
      age: 'Patientens ålder vid baslinjebedömning',
      educationYears: 'Totalt antal år med formell utbildning',
      BMI: 'Kroppsmasseindex',
      PWMH: 'Periventrikulär vitsubstanshyperintensitet',
      DWMH: 'Djup vitsubstanshyperintensitet',
      totalCMB: 'Totalt antal cerebrala mikroblödningar',
      D_dimer: 'Fibrinnedbrytningsmarkör som speglar koagulations- och fibrinolysaktivering',
      ATIII: 'Antitrombin III, markör för endogen antikoagulant aktivitet',
      Fbg: 'Fibrinogen, koagulationssubstrat och inflammationsrelaterat protein',
      FDP: 'Fibrin/fibrinogen-nedbrytningsprodukter som speglar fibrinolys',
      TT: 'Trombintid, speglar omvandling från fibrinogen till fibrin',
      APTT: 'Aktiverad partiell tromboplastintid för intrinsiska/gemensamma koagulationsvägar',
      LDL_C: 'LDL-kolesterol',
      LDH: 'Laktatdehydrogenas, enzym kopplat till vävnadsskada och metabolism',
      Crea: 'Serumkreatinin, markör för njurfunktion',
      NLR: 'Neutrofil-lymfocytkvot, markör för systemisk inflammation',
      IgL: 'Immunglobulin lambda-lättkedja, immunrelaterad markör',
      CA72_4: 'Kolhydratantigen 72-4, tumörassocierad serummarkör',
    },
    interpretation: {
      '0-2': {
        level: 'Predikterat kliniskt stadium 0-2',
        text:
          'Den aktuella multidimensionella profilen ligger närmast den tidigaste kliniska stadiegruppen.',
        advice:
          'Granska överensstämmelse med biologiskt stadium, kognitiv testning och plan för longitudinell uppföljning.',
      },
      '3-4': {
        level: 'Predikterat kliniskt stadium 3-4',
        text:
          'Den aktuella multidimensionella profilen är mest förenlig med ett intermediärt kliniskt stadium.',
        advice:
          'Denna undergrupp är också mest relevant för explorativ granskning av progressionsrisk.',
      },
      '5': {
        level: 'Predikterat kliniskt stadium 5',
        text:
          'Den aktuella profilen tyder på högre klinisk belastning än vid tidig sjukdom.',
        advice:
          'Granska systembidragen och bedöm om vaskulära, koagulationsrelaterade, metabola eller inflammatoriska faktorer driver poängen.',
      },
      '6': {
        level: 'Predikterat kliniskt stadium 6',
        text:
          'Den aktuella profilen ligger närmast den mest avancerade kliniska stadiegruppen i denna prototyp.',
        advice:
          'Använd resultatet som en förklarande forskningssignal och verifiera mot klinisk bedömning.',
      },
    },
  },
};

function getTranslation(language, path) {
  return path.split('.').reduce((current, key) => current?.[key], translations[language]);
}

function format(template, params = {}) {
  return String(template).replace(/\{(\w+)\}/g, (_, key) => params[key] ?? '');
}

export function t(language, path, params = {}) {
  const template =
    getTranslation(language, path) ?? getTranslation('en', path) ?? path;
  return format(template, params);
}

export function tf(language, path, fallback, params = {}) {
  const template = getTranslation(language, path) ?? fallback;
  return format(template, params);
}
