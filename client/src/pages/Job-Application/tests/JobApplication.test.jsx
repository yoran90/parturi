import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import JobApplication from '../JobApplication';
import axios from 'axios';
import { toast } from 'react-toastify';

// Mock axios and toast
vi.mock('axios');
vi.mock('react-toastify', () => ({
  toast: { error: vi.fn(), success: vi.fn() },
}));

describe('JobApplication Component', () => {
  const closeMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    render(<JobApplication close={closeMock} />);
  });

  test('renders all fields correctly', () => {
    expect(screen.getByLabelText(/Etunimi/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Sukunimi/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Anna sähköpostiosoite/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Anna puhelinnumero/i)).toBeInTheDocument();
    expect(screen.getByText(/Valitse työsuhteeseen/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Kuukausi/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Päivä/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Vuosi/i)).toBeInTheDocument();
    expect(screen.getByText(/Valitse tiedosto/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Kirjoita motivaatiokirjeesi/i)).toBeInTheDocument();
    expect(screen.getByText(/Lähetä työhakemus/i)).toBeInTheDocument();
  });

  test('shows error if required fields are missing', async () => {
    fireEvent.click(screen.getByText(/Lähetä työhakemus/i));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'Kaikki kentät ovat pakollisia, jos tahdel on *, se on pakollinen'
      );
    });
  });

  test('fills out the form and submits successfully', async () => {
    // Fill out inputs
    fireEvent.change(screen.getByLabelText(/Etunimi/i), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByLabelText(/Sukunimi/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/Anna sähköpostiosoite/i), { target: { value: 'jane@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Anna puhelinnumero/i), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Osa-aikainen' } });
    fireEvent.change(screen.getByPlaceholderText(/Kuukausi/i), { target: { value: '2026-01' } });
    fireEvent.change(screen.getByPlaceholderText(/Päivä/i), { target: { value: '24' } });
    fireEvent.change(screen.getByPlaceholderText(/Vuosi/i), { target: { value: '2026' } });
    fireEvent.change(screen.getByPlaceholderText(/Kirjoita motivaatiokirjeesi/i), { target: { value: 'Motivation letter...' } });

    // Mock axios response
    axios.post.mockResolvedValue({ data: { success: true } });

    // Submit the form
    fireEvent.click(screen.getByText(/Lähetä työhakemus/i));

    await waitFor(() => {
      // Success message should appear
      expect(screen.getByText(/Hakemuksesi on lähetetty/i)).toBeInTheDocument();
    });
  });

  test('uploads a file correctly', async () => {
    const file = new File(['resume content'], 'resume.pdf', { type: 'application/pdf' });

    // Get the hidden input via label
    const input = screen.getByLabelText(/Valitse tiedosto/i);
    fireEvent.change(input, { target: { files: [file] } });

    // Check that the file name appears
    expect(screen.getByText(/Valittu tiedosto:/i)).toBeInTheDocument();
    expect(screen.getByText(/resume.pdf/i)).toBeInTheDocument();
  });


  test('calls close when clicking ❌ button', () => {
    fireEvent.click(screen.getByText('❌'));
    expect(closeMock).toHaveBeenCalled();
  });
});
