# معمارية النظام | System Architecture

توضح هذه الوثيقة المخططات الهندسية لعناصر تطبيق **Claude Atlas**، وتفاصيل تفاعل المكونات البرمجية فيما بينها.

---

## 1. مخطط مكونات النظام (Component Architecture Diagram)

```mermaid
graph TB
    subgraph AppRoot ["نقطة الدخول الرئيسية: src/App.tsx"]
        AppProvider["AppProvider (src/context/AppContext.tsx)"]
        MainRouter["MainRouter"]
    end

    subgraph GlobalControls ["عناصر التحكم العامة (src/components/common)"]
        Navbar["شريط التنقل العلوي (Navbar)"]
        Footer["التذييل (Footer)"]
        MobileNav["شريط التنقل السفلي للهواتف (MobileBottomNav)"]
        CmdPalette["لوحة الأوامر السريعة (CommandPalette Cmd+K)"]
        PathDrawer["درج مساري التعليمي (MyPathDrawer)"]
        Toast["نظام التنبيهات (Toast)"]
    end

    subgraph ViewsLayer ["طبقة الواجهات (src/views/)"]
        V_Home["HomeView"]
        V_Map["FullMapView"]
        V_Cap["CapabilityView"]
        V_Learn["LearnView"]
        V_Paths["LearningPathsView"]
        V_Cmds["CommandsView"]
        V_Playbooks["PlaybooksView"]
        V_Gen["GeneratorsView"]
        V_Prompt["PromptLabView"]
        V_Dash["DashboardView"]
    end

    subgraph SpecializedComponents ["المكونات التخصصية (src/components/)"]
        MapEngine["محرك الخريطة البصرية (src/components/map/)"]
        LessonRenderer["عارض الدروس ذو الـ 14 نقطة (src/components/lessons/)"]
        SubagentSim["محاكي الوكلاء (src/components/simulations/SubagentsSandboxSimulator)"]
        HooksSim["محاكي الخطافات (src/components/simulations/HooksLifecycleTimeline)"]
        ComparisonsComp["مقارنات معمارية (src/components/comparisons/)"]
    end

    subgraph DataModules ["وحدات البيانات (src/data/)"]
        D_Cap["capabilities.ts & enrichment.ts"]
        D_Cats["categories.ts"]
        D_Paths["learningPaths.ts"]
        D_Cmds["commands.ts"]
        D_Play["playbooks.ts"]
        D_Tpl["templates.ts"]
        D_Comp["comparisons.ts"]
    end

    AppProvider --> MainRouter
    MainRouter --> GlobalControls
    MainRouter --> ViewsLayer

    V_Map --> MapEngine
    V_Learn --> LessonRenderer
    V_Cap --> LessonRenderer
    V_Home --> ComparisonsComp
    V_Gen --> SubagentSim
    V_Playbooks --> HooksSim

    ViewsLayer --> DataModules
    AppProvider -.-> DataModules
```

---

## 2. بنية المكونات التفاعلية وحجمها

### 2.1 محرك الخريطة البصرية (`src/components/map/`)
- يعتمد على مصفوفة العقد والعلاقات المعمارية (`nodes` و `edges`) لرسم خريطة شبكية تفاعلية باستخدام تقنيات SVG الصافية.
- يدعم التكبير، التحريك (Zoom/Pan)، وتحديد العقد لفتح تفاصيلها مباشرة في درج التفاصيل (Detail Drawer).

### 2.2 محاكي الوكلاء الفرعيين (`SubagentsSandboxSimulator.tsx`)
- محاكي تفاعلي يعرض دورة حياة استدعاء الوكيل الفرعي:
  1. بدء المهمة (Spawn)
  2. عزل السياق وحقن الأدوات المحددة
  3. تنفيذ الأدوات بالتوازي
  4. تلخيص النتائج والعودة للمحادثة الأساسية.

### 2.3 محاكي خطافات دورة الحياة (`HooksLifecycleTimeline.tsx`)
- خط زمني تفاعلي يحاكي اعتراض الأحداث:
  - `Pre-Tool`: التحقق من الصلاحيات والبارامترات.
  - `Permission-Gate`: موافقة المستخدم أو الرفض التلقائي.
  - `Execution`: تشغيل الأمر.
  - `Post-Tool`: تسجيل السجلات والتوثيق.
  - `On-Error`: استراتيجية التعافي والتحليل.

---
*الوثائق ذات الصلة:*
- [معمارية التطبيق](./application-architecture.md)
- [تدفق البيانات](./data-flow.md)
