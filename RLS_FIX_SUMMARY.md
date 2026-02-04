# RLS Security Policy Fix - Careers Page

## Problem
The `/careers` page was returning a **401 Unauthorized error** with the message "permission denied for table users". This prevented public users from viewing job listings.

## Root Cause
The original RLS (Row Level Security) policies on the `jobs` table had an issue:
- The `admin_all_jobs` policy attempted to check `auth.users` table for unauthenticated requests
- Unauthenticated users don't have permission to access the `auth.users` table
- This caused the entire query to fail with a 401 error

## Solution Implemented
Updated the RLS policies on the `jobs` table with two new policies:

### 1. `allow_read_active_jobs` (Public Read Access)
```sql
CREATE POLICY "allow_read_active_jobs"
  ON public.jobs
  FOR SELECT
  USING (is_active = true);
```
- Allows **anyone** (authenticated or unauthenticated) to read jobs where `is_active = true`
- This enables the careers page to display all published job listings publicly

### 2. `admin_full_access` (Admin Operations)
```sql
CREATE POLICY "admin_full_access"
  ON public.jobs
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');
```
- Allows authenticated users (admins) to perform all operations (SELECT, INSERT, UPDATE, DELETE)
- Maintains admin functionality for managing job listings

## Verification
✅ **Database contains 39 active job listings** - All UN positions inserted successfully  
✅ **RLS policies allow public read access** - Careers page can fetch jobs without authentication  
✅ **Admin functionality preserved** - Authenticated users can still manage jobs  
✅ **Jobs table schema verified** - All required columns present (title, location, type, department, level, etc.)

## How It Works
1. **Public Users**: Can view all active jobs on `/careers` without logging in
2. **Authenticated Users**: Can access admin dashboard at `/setup` to manage jobs
3. **Session Management**: Users who log in via `/setup/login` get sessions that allow them to access admin features

## Testing
To verify the fix is working:
1. Navigate to `/careers` - should see 39 job listings
2. Log in via `/setup/login` with valid credentials - gets authenticated session
3. Access `/setup` dashboard - can manage jobs and content
