import { render, screen } from "@testing-library/react"
import { MemoryRouter, Routes, Route } from "react-router-dom"
import Home from "../Home"


vi.mock("../Header", () => ({
  default: () => <div>HEADER</div>,
}))

vi.mock("../Sidebar", () => ({
  default: () => <div>SIDEBAR</div>,
}))


test("renders admin layout with header, sidebar and outlet", () => {
  render(
    <MemoryRouter initialEntries={["/admin"]}>
      <Routes>
        <Route path="/admin" element={<Home />}>
          <Route index element={<div>OUTLET CONTENT</div>} />
        </Route>
      </Routes>
    </MemoryRouter>
  )

  expect(screen.getByText("HEADER")).toBeInTheDocument()
  expect(screen.getByText("SIDEBAR")).toBeInTheDocument()
  expect(screen.getByText("OUTLET CONTENT")).toBeInTheDocument()
})
