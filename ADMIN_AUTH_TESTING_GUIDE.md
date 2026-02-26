# Admin Dashboard Authentication - Testing Guide

## Quick Start

### Access the Admin Portal
1. Navigate to `http://localhost:3000/setup` (or your deployment URL + /setup)
2. You'll see the professional admin portal homepage

## Testing Scenarios

### ✅ Test 1: Valid Domain Registration
**Objective:** Verify that @unedp.org emails can register

**Steps:**
1. Click "Create Account" on homepage
2. Enter form data:
   - Full Name: `Test User`
   - Email: `testuser@unedp.org`
   - Department: `Communications`
   - Password: `TestPassword123`
   - Confirm Password: `TestPassword123`
   - Reason: `Testing admin access`
3. Click "Submit Request"

**Expected Result:**
- No error messages
- Redirected to confirmation page
- Email verification message shown

---

### ✅ Test 2: Valid Domain - Alternative Organization
**Objective:** Verify that @alghahim.co.ke emails can register

**Steps:**
1. Click "Create Account"
2. Enter form data:
   - Email: `admin@alghahim.co.ke`
   - Other fields: Same as Test 1
3. Click "Submit Request"

**Expected Result:**
- Registration succeeds
- Confirmation page shown

---

### ❌ Test 3: Invalid Domain - Gmail
**Objective:** Verify that @gmail.com emails are rejected with generic error

**Steps:**
1. Click "Create Account"
2. Enter form data:
   - Email: `testuser@gmail.com`
   - Other fields: Valid data
3. Click "Submit Request"

**Expected Result:**
- Error appears: "Email not recognized in system. Please use your work email address."
- **No mention** of allowed domains (@unedp.org, @alghahim.co.ke)
- Form remains visible for retry

---

### ❌ Test 4: Invalid Domain - Generic Corporate
**Objective:** Verify various invalid domains are rejected

**Steps:**
Repeat Test 3 with these emails:
- `user@microsoft.com`
- `admin@company.org`
- `test@yahoo.com`

**Expected Result:**
- All show same generic error
- No domain information leaked

---

### ✅ Test 5: Valid Domain Login
**Objective:** Verify @unedp.org users can login

**Prerequisites:**
- Account registered with @unedp.org email
- Email verified (check spam folder if needed)

**Steps:**
1. Click "Sign In" on homepage
2. Enter credentials:
   - Email: `testuser@unedp.org`
   - Password: `TestPassword123`
3. Click "Sign In"

**Expected Result:**
- No errors
- Redirected to dashboard at `/setup/dashboard`
- Sidebar visible with navigation menu
- Email shown in sidebar footer

---

### ✅ Test 6: Dashboard Access After Login
**Objective:** Verify authenticated users can access dashboard

**Prerequisites:**
- Logged in as valid user

**Steps:**
1. You should be at `/setup/dashboard`
2. Click on different navigation items:
   - Dashboard
   - Jobs
   - Applications
   - Countries
   - News & Stories
   - Resources
   - Settings

**Expected Result:**
- All pages load without redirect to login
- Sidebar remains visible
- User email visible in footer
- Logout button available

---

### ❌ Test 7: Invalid Domain Login
**Objective:** Verify @gmail.com users are rejected

**Steps:**
1. Click "Sign In"
2. Enter credentials:
   - Email: `testuser@gmail.com`
   - Password: `AnyPassword123`
3. Click "Sign In"

**Expected Result:**
- Error: "Email not recognized in system. Please use your work email address."
- NO error about invalid credentials
- Form remains visible

---

### ✅ Test 8: Logout Functionality
**Objective:** Verify logout clears session

**Prerequisites:**
- Logged in to dashboard

**Steps:**
1. In sidebar footer, click "Logout" button
2. You should be redirected to `/setup/login`
3. Try accessing `/setup/dashboard` directly

**Expected Result:**
- Redirected back to login
- Session cleared
- Cannot access protected pages

---

### ✅ Test 9: Session Persistence
**Objective:** Verify session persists across pages

**Prerequisites:**
- Logged in to dashboard

**Steps:**
1. Navigate to `/setup/dashboard`
2. Click on "Jobs" in sidebar
3. Go back to dashboard
4. Refresh page

**Expected Result:**
- Still logged in after page refresh
- No redirect to login
- Session maintained

---

### ❌ Test 10: Unauthenticated Access Protection
**Objective:** Verify unauthenticated users can't access dashboard

**Steps:**
1. Open new incognito/private window
2. Try to visit `http://localhost:3000/setup/dashboard` directly
3. Try to visit any other protected route

**Expected Result:**
- Redirected to `/setup/login`
- Cannot access any protected pages without authentication

---

### ✅ Test 11: Public Pages Access Without Auth
**Objective:** Verify public pages are accessible without login

**Steps:**
1. Open new incognito window
2. Visit `/setup` (homepage)
3. Visit `/setup/login`
4. Visit `/setup/register`

**Expected Result:**
- All pages load without redirects
- No authentication required
- Can navigate between public pages freely

---

### ✅ Test 12: Link Navigation
**Objective:** Verify all links work correctly

**On Homepage:**
- "Sign In" button → `/setup/login`
- "Create Account" button → `/setup/register`
- "Back to Website" link → `/`

**On Login Page:**
- "Create one" link → `/setup/register`
- "Get help" link → `/setup/troubleshooting` (if exists)
- "Back to main website" → `/`

**On Register Page:**
- "Sign in" link → `/setup/login`
- "Return to main website" → `/`

**Expected Result:**
- All links navigate to correct pages
- No broken links
- Navigation works both ways

---

## Allowed Domains Summary

| Domain | Registration | Login | Notes |
|--------|-------------|-------|-------|
| @unedp.org | ✅ Allowed | ✅ Allowed | Primary domain |
| @alghahim.co.ke | ✅ Allowed | ✅ Allowed | Secondary domain |
| @gmail.com | ❌ Blocked | ❌ Blocked | Generic error shown |
| @hotmail.com | ❌ Blocked | ❌ Blocked | Generic error shown |
| Any other | ❌ Blocked | ❌ Blocked | Generic error shown |

---

## Security Features to Verify

1. **Domain Validation is Silent**
   - No console errors revealing validation logic
   - No error messages mentioning specific domains

2. **Generic Error Messages**
   - Never see: "Only @unedp.org and @alghahim.co.ke are allowed"
   - Always see: "Email not recognized in system"

3. **Session Security**
   - Logout clears session
   - Can't access protected pages after logout
   - Session persists on page refresh (not lost)

4. **BRANDING**
   - All pages show UNEDP logo
   - UNEDP copyright in footers
   - Consistent branding throughout

---

## Troubleshooting

### Issue: Registration form keeps showing
**Cause:** Email validation failed  
**Fix:** Ensure email ends with @unedp.org or @alghahim.co.ke

### Issue: "Email not recognized" error on valid domain
**Cause:** Domain validation is case-sensitive edge case  
**Fix:** Try lowercase email address

### Issue: After login, redirected back to login page
**Cause:** Session not created properly  
**Fix:** Check Supabase credentials in environment variables

### Issue: Sidebar not showing after login
**Cause:** Layout not recognizing authenticated state  
**Fix:** Try logout and login again, or check browser dev tools

---

## Performance Testing

### Load Times
- Homepage should load instantly
- Login/Register pages < 500ms
- Dashboard load < 1s

### Responsive Design
Test on these viewports:
- Mobile: 375px (iPhone SE)
- Tablet: 768px (iPad)
- Desktop: 1920px

---

## Email Verification Testing

After registration:
1. Check email inbox for verification link
2. Check spam folder if not in inbox
3. Click verification link
4. Should be able to login after verification

---

## Notes

- **Test accounts should use work emails** from allowed domains
- **Password minimum:** 8 characters
- **Domain check is case-insensitive:** user@UNEDP.ORG works
- **All validations happen before Supabase:** Saves API calls for invalid domains
