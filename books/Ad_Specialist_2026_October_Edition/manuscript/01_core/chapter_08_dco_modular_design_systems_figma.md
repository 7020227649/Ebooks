# Chapter 8: Dynamic Creative Optimization (DCO), Modular Design Systems & Figma Workflows

## 1. Building a Component-Based Ad Design System in Figma

High-scale performance marketing teams do not design ads one by one in isolated files. They build a **Modular Ad Design System** in Figma using Auto-Layout, Component Properties, and Design Tokens.

```
┌────────────────────────────────────────────────────────────────────────┐
│                   MODULAR AD DESIGN SYSTEM ARCHITECTURE                │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
         ┌──────────────────────────┼──────────────────────────┐
         ▼                          ▼                          ▼
┌──────────────────┐       ┌──────────────────┐       ┌──────────────────┐
│ Hook Layer       │       │ Visual Body Layer│       │ Conversion Layer │
│ • 5 Swappable    │       │ • Lifestyle Photo│       │ • Star Rating Pill│
│   Headline Bars  │       │ • 3D Render      │       │ • Dynamic Pricing│
│ • Color Themes   │       │ • Video Loop     │       │ • CTA Button Pill│
└────────┬─────────┘       └────────┬─────────┘       └────────┬─────────┘
         │                          │                          │
         └──────────────────────────┼──────────────────────────┘
                                    ▼
             Figma Auto-Layout Dynamic Component Synthesis
            (Outputs 100+ Variations via CSV Data Ingestion)
```

### Master Figma Components:
1. **The Hook Container**: Dynamic auto-layout banner with variant properties for `Type = [Warning, Question, Metric, Testimonial]` and `Theme = [Dark, Neon, Clean]`.
2. **The Product Viewport**: Standardized frame supporting interchangeable 1:1 and 9:16 asset components.
3. **The Proof Badge Component**: Reusable sticker variants: `[5-Star Trustpilot, Forbes Featured, Doctor Approved, 100k+ Sold]`.
4. **The CTA Anchor Pill**: Reusable conversion button with customizable labels (`Shop Now`, `Claim Offer`, `Get Instant Access`).

---

## 2. The Algorithmic DCO Matrix: Combinatorial Testing

Dynamic Creative Optimization (DCO) breaks down the traditional static ad into decoupled algorithmic variables. The machine assembles variations to discover the highest-converting combination for each micro-audience:

$$\text{Total Creative Permutations} = V_{\text{Visuals}} \times H_{\text{Headlines}} \times B_{\text{Body Copy}} \times C_{\text{CTAs}}$$

For an enterprise sprint:
$$5 \text{ Visuals} \times 5 \text{ Headlines} \times 3 \text{ Body Copies} \times 2 \text{ CTAs} = 150 \text{ Unique Ad Combinations}$$

### The 3:2:2 Dynamic Testing Protocol (Meta Advantage+)
In Meta's Dynamic Creative sandbox, populate each ad unit with:
* **3 Creative Assets**: Mix of static graphics, UGC video, and feature callout.
* **2 Primary Texts**: 1 short punchy copy ($< 150$ chars) and 1 long-form narrative breakdown ($> 500$ chars).
* **2 Headlines**: 1 benefit-driven headline and 1 social-proof headline.

---

## 3. Creative Naming Conventions & Performance Taxonomy

Without a standardized naming convention, reporting on creative winners becomes impossible across multi-million dollar ad accounts. Enforce this strict taxonomy in your ad naming:

```
[Channel]_[Product]_[FunnelStage]_[Framework]_[Angle]_[Format]_[AssetID]_[Date]
```

### Production Example:
```
FB_SAAS_TOF_USVSTHEM_TRACKINGLOSS_STATIC_IMG042_202610
TT_SAAS_TOF_UGC_DEVFRUSTRATION_VIDEO916_VID019_202610
GG_SAAS_BOF_REVIEW_TRUSTPILOT_RDA_IMG007_202610
```

### Tracking Creative Fatigue Velocity
Creative fatigue occurs when an ad's audience saturation crosses the decay threshold. We quantify **Fatigue Velocity ($v_f$)**:

$$v_f = \frac{\Delta \text{Frequency (7-day)}}{\Delta t} \times \frac{1}{\text{First-Time Impression Ratio (FTIR)}}$$

> [!NOTE]
> When **FTIR drops below 45%** and 7-day frequency climbs above **2.8**, CPA increases exponentially. Trigger an automated creative refresh rule to rotate in new visual hooks before unit economics collapse.
