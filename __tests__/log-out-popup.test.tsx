// __tests__/LogOutModalPopup.test.tsx
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LogOutModalPopup } from '@/components/header/log-out-popup';
import { signOutUser } from '@/lib/auth';
import { useTranslations } from 'next-intl';

// Mock the signOut function and useTranslations hook
jest.mock('@/lib/auth', () => ({
  signOutUser: jest.fn(),
}));

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('LogOutModalPopup', () => {
  it('renders modal when isOpen is true', () => {
    render(<LogOutModalPopup isOpen={true} onClose={() => {}} />);

    // Check if the modal content is present
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
    expect(screen.getByText('You will log out from your account')).toBeInTheDocument();
    expect(screen.getByText('cancel')).toBeInTheDocument(); // Translation key 'cancel'
    expect(screen.getByText('Header.logout')).toBeInTheDocument(); // Translation key 'Header.logout'
  });

  it('calls onClose when cancel button is clicked', () => {
    const onClose = jest.fn();
    render(<LogOutModalPopup isOpen={true} onClose={onClose} />);

    // Click the cancel button
    fireEvent.click(screen.getByText('cancel'));

    // Verify onClose is called
    expect(onClose).toHaveBeenCalled();
  });

  it('calls signOut when logout button is clicked', () => {
    render(<LogOutModalPopup isOpen={true} onClose={() => {}} />);

    // Click the logout button
    fireEvent.click(screen.getByText('Header.logout'));

    // Verify signOut is called
    expect(signOutUser).toHaveBeenCalled();
  });

  it('does not render modal content when isOpen is false', () => {
    render(<LogOutModalPopup isOpen={false} onClose={() => {}} />);

    // Check if the modal content is not present
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});