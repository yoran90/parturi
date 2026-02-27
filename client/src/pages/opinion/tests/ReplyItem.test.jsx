import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import ReplyItem from "../ReplyItem";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

/* ---------------- MOCKS ---------------- */

vi.mock("react-redux", () => ({
  useSelector: vi.fn(),
}));

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    Link: ({ children, to }) => <a href={to}>{children}</a>,
  };
});

vi.mock("react-toastify", () => ({
  toast: {
    error: vi.fn(),
  },
}));

vi.mock("../../loading/Loading", () => ({
  default: () => <div data-testid="loading-spinner" />,
}));

/* ---------------- DATA ---------------- */

const mockReply = {
  _id: "reply1",
  userId: "user1",
  firstName: "John",
  lastName: "Doe",
  reply: "This is a reply",
  createdAt: new Date().toISOString(),
  profileImage: { url: "profile.jpg" },
  imageReply: { url: "reply.jpg" },
  gender: "men",
  replies: [
    {
      _id: "child1",
      userId: "user2",
      firstName: "Jane",
      lastName: "Smith",
      reply: "Child reply",
      createdAt: new Date().toISOString(),
      profileImage: { url: "child.jpg" },
      gender: "women",
      replies: [],
    },
  ],
};

const mockUser = { id: "user123" };

const renderComponent = (user = mockUser, onReply = vi.fn()) => {
  useSelector.mockImplementation((cb) =>
    cb({ userAuth: { user } })
  );

  return render(
    <MemoryRouter>
      <ReplyItem
        reply={mockReply}
        reviewId="review1"
        parentId={null}
        onReply={onReply}
      />
    </MemoryRouter>
  );
};

beforeEach(() => {
  vi.clearAllMocks();
});

/* ---------------- TESTS ---------------- */

describe("ReplyItem", () => {
  it("renders reply user info and text", () => {
    renderComponent();

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("This is a reply")).toBeInTheDocument();

    const images = screen.getAllByAltText("reply");
    expect(images[0]).toHaveAttribute("src", "profile.jpg");
  });

  it("toggles reply input box", () => {
    renderComponent();

    const toggleBtn = screen.getAllByLabelText("Toggle reply")[0];

    fireEvent.click(toggleBtn);
    expect(screen.getByTestId("reply-input")).toBeInTheDocument();

    fireEvent.click(toggleBtn);
    expect(screen.queryByTestId("reply-input")).not.toBeInTheDocument();
  });

  it("submits reply text", async () => {
    const onReply = vi.fn();
    renderComponent(mockUser, onReply);

    fireEvent.click(screen.getAllByLabelText("Toggle reply")[0]);

    fireEvent.change(screen.getByTestId("reply-input"), {
      target: { value: "New reply" },
    });

    fireEvent.submit(screen.getByTestId("reply-input").closest("form"));

    await waitFor(() => {
      expect(onReply).toHaveBeenCalledTimes(1);
      const formData = onReply.mock.calls[0][2];
      expect(formData.get("reply")).toBe("New reply");
    });
  });

  it("uploads and removes reply image", async () => {
    renderComponent();

    fireEvent.click(screen.getAllByLabelText("Toggle reply")[0]);

    const file = new File(["test"], "test.png", { type: "image/png" });

    fireEvent.change(screen.getByTestId("reply-file-input"), {
      target: { files: [file] },
    });

    expect(screen.getByAltText("preview")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("remove-image-btn"));

    await waitFor(() => {
      expect(screen.queryByAltText("preview")).not.toBeInTheDocument();
    });
  });

 it("shows login prompt if user is not logged in", () => {
    renderComponent(null);

    const toggleBtn = screen.getAllByLabelText("Toggle reply")[0];
    fireEvent.click(toggleBtn);

    const loginPrompts = screen.queryAllByText(/Kirjaudu sisään/i);
    const loginPrompt = loginPrompts[0];

    fireEvent.click(loginPrompt.closest("div"));

    expect(mockNavigate).toHaveBeenCalledWith("/kirjaudu");
    expect(toast.error).toHaveBeenCalled();
  });


  it("renders child replies recursively", () => {
    renderComponent();

    expect(screen.getByText("Child reply")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });
});
