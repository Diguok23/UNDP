# Admin Dashboard Authentication - User Flows

## 🏠 User Journey Maps

### New User Registration Flow

\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│ START: Visit http://yoursite.com/setup                          │
│ (Admin Portal Homepage)                                         │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
            ┌────────────────┐
            │  Homepage      │
            │ See features   │
            │ and CTA buttons│
            └────────┬───────┘
                     │
          ┌──────────┴──────────┐
          │                     │
    Click "Create Account" Click "Sign In"
          │                     │
          ▼                     ▼
  ┌────────────────┐  ┌────────────────┐
  │ Register Form  │  │  Login Form    │
  └────────┬───────┘  └────────┬───────┘
           │                   │
           ▼                   ▼
    ┌──────────────┐    ┌──────────────┐
    │Domain Check? │    │Domain Check? │
    │@unedp.org    │    │@unedp.org    │
    │@alghahim..   │    │@alghahim..   │
    └──┬────────┬──┘    └──┬────────┬──┘
       │        │          │        │
      YES      NO        YES      NO
       │        │          │        │
       ▼        ▼          ▼        ▼
    ┌──┐    ┌──────┐    ┌──┐   ┌──────────┐
    │OK│    │ERROR:│    │OK│   │   ERROR: │
    │  │    │"Email│    │  │   │ "Email  │
    │  │    │not   │    │  │   │ not     │
    │  │    │rec..." │   │  │   │rec..."  │
    └──┘    └──────┘    └──┘   └──────────┘
     │         │         │        │
     ▼         ▼         ▼        ▼
  ┌────┐   SHOW    CREATE  SHOW
  │Send│   ERROR   SESSION ERROR
  │EMAIL│
  └────┘
     │
     ▼
 VERIFY EMAIL
     │
     ▼
  ┌──────────────────────────────┐
  │ Can now login               │
  │ at /setup/login             │
  └──────────────┬───────────────┘
                 │
                 ▼
          ┌────────────────┐
          │ Login Form     │
          │ With domain    │
          │ validation     │
          └────────┬───────┘
                   │
                   ▼
            ┌──────────────┐
            │ Credentials  │
            │ validated    │
            └────────┬─────┘
                     │
                     ▼
          ┌──────────────────────┐
          │ Redirect to:        │
          │ /setup/dashboard    │
          └──────────┬───────────┘
                     │
                     ▼
          ┌──────────────────────────┐
          │ ADMIN DASHBOARD READY   │
          │ • Sidebar visible        │
          │ • User email displayed   │
          │ • Can access all pages   │
          │ • Logout button ready    │
          └──────────────────────────┘
\`\`\`

---

### Existing User Login Flow

\`\`\`
┌──────────────────────────────────────────┐
│ START: Visit /setup                      │
│ (Check: Already logged in?)              │
└─────────────┬────────────────────────────┘
              │
        NO (unauthenticated)
              │
              ▼
    ┌──────────────────┐
    │ Homepage /setup  │
    │ Show "Sign In"   │
    │ and "Register"   │
    └────────┬─────────┘
             │
       Click "Sign In"
             │
             ▼
    ┌────────────────────┐
    │ Login Page         │
    │ /setup/login       │
    └─────────┬──────────┘
              │
              ▼
    ┌─────────────────────┐
    │ Enter credentials:  │
    │ • Email             │
    │ • Password          │
    └─────────┬───────────┘
              │
              ▼
    ┌──────────────────────┐
    │ CLIENT: Check domain │
    │ @unedp.org?          │
    │ @alghahim.co.ke?     │
    └────┬─────────────┬───┘
         │             │
        YES           NO
         │             │
         ▼             ▼
    ┌────┐        ┌──────────┐
    │OK  │        │ SHOW     │
    │    │        │ ERROR    │
    │    │        │ "Email   │
    │    │        │ not      │
    │    │        │ rec..."  │
    └────┘        └──────────┘
     │                  │
     ▼                  ▼
  SEND TO         User sees
  SUPABASE        generic error
     │            message
     ▼            No domain
  ┌──────────┐    info leaked
  │ Verify   │
  │Password  │
  └────┬─────┘
       │
     ┌─┴─┐
     │   │
    OK   ERROR
     │   │
     ▼   ▼
  CREATE SHOW
  SESSION ERROR
     │    │
     ▼    ▼
  REDIRECT Try Again
  /setup/
  dashboard
     │
     ▼
  ┌─────────────────────────────┐
  │ SUCCESS!                    │
  │ • Logged in                 │
  │ • Dashboard loaded          │
  │ • Session active            │
  │ • Can navigate all pages    │
  └─────────────────────────────┘
\`\`\`

---

### Invalid Domain Attempt Flow

\`\`\`
┌──────────────────────────────────────────┐
│ User tries to login with                 │
│ @gmail.com or other invalid domain       │
└─────────────┬───────────────────────────┘
              │
              ▼
    ┌────────────────────┐
    │ User enters:       │
    │ Email: invalid...  │
    │ Password: ****     │
    └─────────┬──────────┘
              │
              ▼
    ┌──────────────────────┐
    │ CLIENT-SIDE FILTER   │
    │ Domain validation    │
    │ BEFORE Supabase call │
    └────┬─────────────┬───┘
         │             │
      @unedp.org      Others
      @alghahim..
         │             │
         ▼             ▼
      ALLOWED      BLOCKED
         │             │
         ▼             ▼
    Send to       SHOW ERROR
    Supabase      ┌──────────┐
                  │"Email not│
                  │recognized│
                  │...use    │
                  │work email│
                  └──────────┘
                        │
                        ▼
                   No Supabase
                   API call made
                   (Saves bandwidth)
                        │
                        ▼
                   User can retry
                   or return home
\`\`\`

---

### Session & Logout Flow

\`\`\`
┌─────────────────────────────────────────┐
│ Authenticated user on /setup/dashboard  │
│ (Session is active)                     │
└──────────────┬─────────────────────────┘
               │
               ▼
    ┌──────────────────────┐
    │ Click Logout button  │
    │ in sidebar footer    │
    └──────────┬───────────┘
               │
               ▼
    ┌──────────────────────┐
    │ Clear Supabase       │
    │ session              │
    └──────────┬───────────┘
               │
               ▼
    ┌──────────────────────┐
    │ Redirect to:         │
    │ /setup/login         │
    └──────────┬───────────┘
               │
               ▼
    ┌──────────────────────┐
    │ Try to access        │
    │ protected route?     │
    └──────────┬───────────┘
               │
         ┌─────┴─────┐
         │           │
      YES            NO
         │           │
         ▼           ▼
    BLOCKED      PUBLIC
    Redirect   (Homepage,
    to login   Login,
               Register)
         │
         ▼
    LOGIN PAGE
    (Session cleared)
\`\`\`

---

## 🔐 Domain Validation Architecture

\`\`\`
┌─────────────────────────────────────────────────────┐
│ Email Submitted (Register or Login)                 │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
        ┌────────────────────┐
        │ CLIENT-SIDE CHECK  │
        │ isAllowedDomain()  │
        └────┬───────────┬───┘
             │           │
           PASS        FAIL
             │           │
             ▼           ▼
        ┌────────┐  ┌─────────────┐
        │ Continue
        │ with    │  │ Show Error  │
        │ Supabase│  │ "Email not  │
        └────┬───┘   │ recognized" │
             │       └─────────────┘
             │              │
             ▼              ▼
        ┌──────────┐    User stays
        │Supabase  │    on form
        │Auth      │    Can retry
        └────┬─────┘
             │
        ┌────┴────┐
        │          │
     SUCCESS    ERROR
        │          │
        ▼          ▼
    CREATE     SHOW ERROR
    SESSION    (Invalid creds)
        │          │
        ▼          ▼
    REDIRECT   User retries
    DASHBOARD
\`\`\`

---

## 📊 Route Protection Matrix

\`\`\`
Route                          Public  Auth Required  Sidebar
─────────────────────────────────────────────────────────────
/setup                         ✅      ❌            ❌
/setup/login                   ✅      ❌            ❌
/setup/register                ✅      ❌            ❌
/setup/dashboard               ❌      ✅            ✅
/setup/jobs                    ❌      ✅            ✅
/setup/applications            ❌      ✅            ✅
/setup/countries               ❌      ✅            ✅
/setup/news                    ❌      ✅            ✅
/setup/resources               ❌      ✅            ✅
/setup/settings                ❌      ✅            ✅
\`\`\`

---

## 🎯 Key Decision Points

\`\`\`
ENTRY POINT
    ↓
Is user authenticated?
    ├─ YES → Check current route
    │         ├─ Public route (/, /login, /register) → Show page
    │         └─ Protected route (/dashboard, etc) → Show dashboard
    │
    └─ NO → Check requested route
            ├─ Public route → Show page
            └─ Protected route → Redirect to /login


REGISTRATION/LOGIN ATTEMPT
    ↓
Extract domain from email
    ↓
Is domain allowed?
    ├─ YES (@unedp.org or @alghahim.co.ke)
    │   ↓
    │   Send to Supabase
    │   ├─ Success → Create session → Redirect to dashboard
    │   └─ Error → Show error message
    │
    └─ NO (any other domain)
        ↓
        Show generic error: "Email not recognized..."
        ↓
        Do NOT contact Supabase
        ↓
        User stays on form
\`\`\`

---

## 📱 Responsive Behavior

### Desktop (1024px+)
- Full sidebar visible
- Logo + text in header
- Two-column layouts where applicable
- Search bar visible

### Tablet (768px - 1023px)
- Collapsible sidebar or drawer menu
- Logo visible
- Touch-friendly button sizes
- Stacked layouts

### Mobile (< 768px)
- Hamburger menu
- Full-screen navigation drawer
- Touch-optimized forms
- Single column layout
- Larger tap targets
