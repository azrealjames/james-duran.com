import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET() {
  try {
    // Path to your resume PDF in the public folder
    const filePath = path.join(process.cwd(), "public", "resume.pdf")

    // Read the file
    const fileBuffer = fs.readFileSync(filePath)

    // Return the file as a response
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="James_Duran_Resume.pdf"',
      },
    })
  } catch (error) {
    console.error("Error serving resume:", error)
    return new NextResponse("Resume not found", { status: 404 })
  }
}
