import { render, screen, fireEvent } from "@testing-library/react"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import { configureStore } from "@reduxjs/toolkit"
import Sidebar from "../Sidebar"
import adminAuthReducer from "../../store/admin-auth"

const renderSidebar = (isOpen = true) => {
  const store = configureStore({
    reducer: { adminAuth: adminAuthReducer },
    preloadedState: { adminAuth: { admin: { firstName:"Admin", lastName:"User", role:"super-admin" } } }
  })

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <Sidebar isOpen={isOpen} setIsOpen={vi.fn()} />
      </MemoryRouter>
    </Provider>
  )
}

test("renders sidebar menu items", () => {
  renderSidebar()
  expect(screen.getByText(/Admin Pannel/i)).toBeInTheDocument()
  expect(screen.getByText(/My Account/i)).toBeInTheDocument()
})

test("overlay click calls setIsOpen false", () => {
  const setIsOpen = vi.fn()
  const store = configureStore({
    reducer: { adminAuth: adminAuthReducer },
    preloadedState: { adminAuth: { admin: { firstName:"Admin", lastName:"User", role:"super-admin" } } }
  })
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Sidebar isOpen={true} setIsOpen={setIsOpen} />
      </MemoryRouter>
    </Provider>
  )
  const overlay = screen.getByTestId("sidebar-overlay") 
  fireEvent.click(overlay)
  expect(setIsOpen).toHaveBeenCalledWith(false)
})

test("clicking menu item navigates and closes sidebar", () => {
  const setIsOpen = vi.fn()
  const store = configureStore({
    reducer: { adminAuth: adminAuthReducer },
    preloadedState: { adminAuth: { admin: { firstName:"Admin", lastName:"User", role:"super-admin" } } }
  })

  render(
    <Provider store={store}>
      <MemoryRouter>
        <Sidebar isOpen={true} setIsOpen={setIsOpen} />
      </MemoryRouter>
    </Provider>
  )

  const menuItem = screen.getByText(/My Account/i)
  fireEvent.click(menuItem)
  expect(setIsOpen).toHaveBeenCalledWith(false)
})
