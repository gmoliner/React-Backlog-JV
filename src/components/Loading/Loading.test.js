import { render, screen } from "@testing-library/react"
import Loading from "./Loading"

test('Loading : verifier le texte affiche quand loading = false', function() {
  render(<Loading loading={false} />)
  const loadingContent = screen.getByText("Valider")
  expect(loadingContent).toBeInTheDocument()
})

test('Loading : verifier la presence du spinner quand loading = true', function() {
  render(<Loading loading={true} />)
  const isloading = screen.getByTestId('spinner-loading');
  expect(isloading).toBeInTheDocument()
})