import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    console.log("[v0] Verifying admin status for user:", user.id)

    // Check admin_users table
    const { data: adminUser, error: adminError } = await supabase
      .from("admin_users")
      .select("is_admin, email, full_name, department")
      .eq("id", user.id)
      .single()

    if (adminError) {
      console.error("[v0] Error checking admin status:", adminError)
      return NextResponse.json(
        { 
          error: "Failed to verify admin status",
          details: adminError.message 
        },
        { status: 400 }
      )
    }

    if (!adminUser) {
      console.log("[v0] User not found in admin_users table")
      return NextResponse.json(
        { 
          is_admin: false,
          message: "User record not found in admin users table" 
        },
        { status: 200 }
      )
    }

    // If user is admin but metadata isn't set, update it
    if (adminUser.is_admin && user.user_metadata?.is_admin !== true) {
      console.log("[v0] Updating user metadata to reflect admin status")
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          ...user.user_metadata,
          is_admin: true,
          full_name: adminUser.full_name,
          department: adminUser.department,
        },
      })

      if (updateError) {
        console.error("[v0] Failed to update user metadata:", updateError)
        return NextResponse.json(
          { 
            error: "Metadata sync failed",
            is_admin: adminUser.is_admin,
            details: updateError.message 
          },
          { status: 200 }
        )
      }

      console.log("[v0] User metadata updated successfully")
    }

    return NextResponse.json(
      {
        is_admin: adminUser.is_admin,
        email: adminUser.email,
        full_name: adminUser.full_name,
        department: adminUser.department,
        message: "Admin status verified",
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("[v0] API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
