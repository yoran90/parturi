import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import AddAboutUs from "../../pages/AddAboutUs"
import { vi } from "vitest"
import { toast } from "react-toastify"
import axios from "axios"



vi.mock("react-quill-new", () => ({
  default: ({ value, onChange }) => (
    <textarea
      data-testid="quill"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}))


vi.mock("react-toastify", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}))


vi.mock("axios", () => ({
  default: {
    post: vi.fn(),
    put: vi.fn(),
  },
}))


vi.mock("../../../hooks/useAboutUs", () => ({
  default: () => ({ getAboutUs: null }),
}))





test("renders AddAboutUs page", () => {
  render(<AddAboutUs />)
  expect(
    screen.getByRole("heading", { name: /add description or title/i })
  ).toBeInTheDocument()
})





test("shows validation error on empty submit", () => {
  render(<AddAboutUs />)

  fireEvent.click(screen.getByText(/Save Change/i))

  expect(toast.error).toHaveBeenCalled()
})

test("can add and remove extra sections", () => {
  render(<AddAboutUs />);

  const buttons = screen.getAllByText(/add another/i);
  fireEvent.click(buttons[0]); 


  const removeButtons = screen.getAllByRole("button", { name: "" });
  fireEvent.click(screen.getByTestId("add-service-button"));
  expect(screen.getAllByPlaceholderText(/we are here to make your hair/i).length).toBe(2);

});


test("submits form successfully", async () => {
  axios.post.mockResolvedValueOnce({ data: {} })

  render(<AddAboutUs />)

  fireEvent.change(screen.getByPlaceholderText(/we make your hair/i), {
    target: { value: "Image title" },
  })


  fireEvent.change(screen.getByPlaceholderText(/we are here to make your hair/i), {
    target: { value: "Service title" },
  })


  fireEvent.change(screen.getByTestId("quill"), {
    target: { value: "Description" },
  })

  const file = new File(["img"], "test.png", { type: "image/png" })
  fireEvent.change(screen.getByTestId("image-upload"), {
    target: { files: [file] },
  })



  fireEvent.click(screen.getByText(/save change/i))

  expect(axios.post).toHaveBeenCalled()
})
