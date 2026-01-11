import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import { vi } from "vitest"
import AddGalleriImage from "../../pages/AddGalleriImage"
import axios from "axios"
import { toast } from "react-toastify"


vi.mock("axios", () => ({
  default: {
    post: vi.fn(),
  },
}))

vi.mock("react-toastify", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}))

global.URL.createObjectURL = vi.fn(() => "preview-url")

describe("AddGalleriImage", () => {
  test("renders page", () => {
    render(<AddGalleriImage />)

    expect(
      screen.getByText(/add galleri/i)
    ).toBeInTheDocument()
  })

  test("shows error when submitting without file", () => {
    render(<AddGalleriImage />)

    fireEvent.click(screen.getByTestId("upload-button"))

    expect(toast.error).toHaveBeenCalled()
  })

  test("select file and show preview", () => {
    render(<AddGalleriImage />)

    const file = new File(["img"], "test.png", { type: "image/png" })

    fireEvent.change(screen.getByTestId("image-input"), {
      target: { files: [file] },
    })

    expect(screen.getByRole("img")).toBeInTheDocument()
  })

  test("remove selected image", () => {
    render(<AddGalleriImage />)

    const file = new File(["img"], "test.png", { type: "image/png" })

    fireEvent.change(screen.getByTestId("image-input"), {
      target: { files: [file] },
    })

    fireEvent.click(screen.getByTestId("remove-image-0"))

    expect(screen.queryByRole("img")).not.toBeInTheDocument()
  })

  test("submit with file calls API", async () => {
    axios.post.mockResolvedValueOnce({ data: {} })

    render(<AddGalleriImage />)

    const file = new File(["img"], "test.png", { type: "image/png" })

    fireEvent.change(screen.getByTestId("image-input"), {
      target: { files: [file] },
    })

    fireEvent.click(screen.getByTestId("upload-button"))

    expect(axios.post).toHaveBeenCalled()
  })
})