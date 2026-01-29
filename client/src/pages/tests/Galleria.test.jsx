import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Galleria from "../Galleria";

// --- Mock hook first ---
const mockUseGallery = vi.fn();

// --- Mock Components ---
vi.mock("../../components/map/Map", () => ({ default: () => <div data-testid="map-component">Map</div> }));
vi.mock("../../components/footer/Footer", () => ({ default: () => <div data-testid="footer-component">Footer</div> }));
vi.mock("../../components/up-header/Information", () => ({ default: () => <div data-testid="information-component">Info</div> }));
vi.mock("../../components/header/Header", () => ({ default: () => <div data-testid="header-component">Header</div> }));
vi.mock("../../components/holy-day/HolyDay", () => ({ default: () => <div data-testid="holyday-component">HolyDay</div> }));

// --- Mock Hooks ---
vi.mock("../../hooks/useGallery", () => ({
  default: () => mockUseGallery(),
}));

  vi.mock("../../hooks/useTitleForPage", () => ({
  default: () => ({
    getTitleForPage: {
      titleForPage: {
        galleriTitle: "Gallery Title",
        galleriDescription: "<p>Gallery description here</p>",
      },
    },
  }),
}));

describe("Galleria Component", () => {
  beforeEach(() => {
    // Default gallery for most tests
    mockUseGallery.mockReturnValue({
      galleryImages: [
        { url: "image1.jpg" },
        { url: "image2.jpg" },
        { url: "image3.jpg" },
        { url: "image4.jpg" },
      ],
      loading: false,
    });
  });

  it("renders all static components", () => {
    render(<Galleria />);
    expect(screen.getByTestId("map-component")).toBeDefined();
    expect(screen.getByTestId("footer-component")).toBeDefined();
    expect(screen.getByTestId("information-component")).toBeDefined();
    expect(screen.getByTestId("header-component")).toBeDefined();
    expect(screen.getByTestId("holyday-component")).toBeDefined();
    expect(screen.getByText("Gallery Title")).toBeDefined();
    expect(screen.getByText("Gallery description here")).toBeDefined();
  });

  it("renders images from gallery", () => {
    render(<Galleria />);
    const images = screen.getAllByRole("img");
    expect(images.length).toBe(4);
    expect(images[0]).toHaveAttribute("src", "image1.jpg");
    expect(images[3]).toHaveAttribute("src", "image4.jpg");
  });

  it("opens and closes lightbox when an image is clicked", async () => {
    render(<Galleria />);

    const firstImage = screen.getAllByRole("img")[0]; // gallery image
    fireEvent.click(firstImage);

    // Wait for lightbox overlay to appear
    const lightboxOverlay = await screen.findByRole("button", { name: "❌" });
    expect(lightboxOverlay).toBeInTheDocument();

    // Close lightbox by clicking the close button
    fireEvent.click(lightboxOverlay);

    // Now check the close button is removed (which means lightbox is closed)
    await waitFor(() => {
      expect(screen.queryByRole("button", { name: "❌" })).not.toBeInTheDocument();
    });
  });



  it("shows message if gallery is empty", () => {
    mockUseGallery.mockReturnValue({ galleryImages: [], loading: false });
    render(<Galleria />);
    expect(screen.getByText("Galleriakuvia ei löytynyt")).toBeDefined();
  });
});
