import "@testing-library/jest-dom"

import { render, screen } from "@testing-library/react"
import { MemoryRouter, Routes, Route } from "react-router-dom"
import ProtectRoute from "../ProtectRoute"

const renderRoute = (props, initialPath = "/admin") => {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route
          path="/admin"
          element={
            <ProtectRoute {...props}>
              <div>PROTECTED CONTENT</div>
            </ProtectRoute>
          }
        />
        <Route path="/login" element={<div>LOGIN PAGE</div>} />
        <Route path="/unauth-page" element={<div>UNAUTHORIZED</div>} />
      </Routes>
    </MemoryRouter>
  )
}


test("shows loader when loading", () => {
  renderRoute({ loading: true, isAuthenticated: true }, "/admin")
  expect(document.querySelector(".loader")).not.toBeNull()
})

test("redirects to login if not authenticated", () => {
  renderRoute({ loading: false, isAuthenticated: false }, "/admin")
  expect(screen.getByText("LOGIN PAGE")).toBeInTheDocument()
})

test("renders protected content when authorized", () => {
  renderRoute({
    loading: false,
    isAuthenticated: true,
    admin: { role: "admin" },
  }, "/admin")

  expect(screen.getByText("PROTECTED CONTENT")).toBeInTheDocument()
})
