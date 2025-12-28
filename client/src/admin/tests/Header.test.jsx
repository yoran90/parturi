import { render, screen, fireEvent } from "@testing-library/react"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import { configureStore } from "@reduxjs/toolkit"
import Header from "../Header"
import adminAuthReducer from "../../store/admin-auth"
import { useNavigate } from "react-router-dom"
import { vi } from "vitest"



vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom")
  return {
    ...actual,
    useNavigate: vi.fn(() => vi.fn()),
  }
})


const renderHeader = () => {
  const store = configureStore({
    reducer: {
      adminAuth: adminAuthReducer,
    },
    preloadedState: {
      adminAuth: {
        admin: {
          firstName: "Admin",
          lastName: "User",
          email: "admin@test.com",
          gender: "men",
          role: "admin",
        },
      },
    },
  })


  return render(
    <Provider store={store}>
      <MemoryRouter>
        <Header isSidebarOpen={false} setIsSidebarOpen={vi.fn()} />
      </MemoryRouter>
    </Provider>
  )
}

test("renders admin header", () => {
  renderHeader()
  expect(screen.getByText(/welcome to admin page/i)).toBeInTheDocument()
})


test("opens profile menu on click", () => {
  renderHeader()
  const avatarButton = screen.getAllByRole("button")[1]
  fireEvent.click(avatarButton)
  expect(screen.getByText(/my account/i)).toBeInTheDocument()
})

//! logout
test("calls logout and navigates", () => {
  const navigate = vi.fn()
  vi.mocked(useNavigate).mockReturnValue(navigate)
  const dispatch = vi.fn()
  
  render(
    <Provider store={configureStore({
      reducer: { adminAuth: adminAuthReducer },
      preloadedState: { adminAuth: { admin: { firstName:"Admin", lastName:"User", email:"admin@test.com", gender:"men", role:"admin" } } }
    })}>
      <MemoryRouter>
        <Header isSidebarOpen={false} setIsSidebarOpen={vi.fn()} />
      </MemoryRouter>
    </Provider>
  )
  

  const avatarButton = screen.getAllByRole("button")[1]
  fireEvent.click(avatarButton)
  
  const logoutButton = screen.getByText(/logout/i)
  fireEvent.click(logoutButton)
  
  expect(navigate).toHaveBeenCalledWith("/login")
})