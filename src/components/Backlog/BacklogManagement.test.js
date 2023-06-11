import { render, screen } from "@testing-library/react";
import { AuthProvider } from "../../providers/AuthProvider";
import BacklogManagement from "./BacklogManagement";

test('Releases : aucune release est affichee si le tableau est vide', function() {
  const contextData = {
    currentUser: null
  };

  render(
    <AuthProvider value={contextData}>
      <BacklogManagement />
    </AuthProvider>
  );

  const notLoggedIn = screen.getByTestId("redirect-login")
  expect(notLoggedIn).toBeInTheDocument()
})