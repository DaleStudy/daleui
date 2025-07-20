import { render, screen, fireEvent } from "@testing-library/react";
import { PasswordInput } from "./PasswordInput";

describe("PasswordInput", () => {
  it("renders correctly", () => {
    render(<PasswordInput />);
    
    const input = screen.getByLabelText(/패스워드/);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "password");
  });

  it("shows placeholder text", () => {
    const placeholder = "패스워드를 입력해주세요.";
    render(<PasswordInput placeholder={placeholder} />);
    
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  it("toggles password visibility when eye icon is clicked", () => {
    render(<PasswordInput />);
    
    const input = screen.getByLabelText(/패스워드/);
    const toggleButton = screen.getByRole("button");
    
    // Initially should be password type
    expect(input).toHaveAttribute("type", "password");
    
    // Click to show password
    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute("type", "text");
    
    // Click to hide password again
    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute("type", "password");
  });

  it("does not toggle visibility when disabled", () => {
    render(<PasswordInput disabled />);
    
    const input = screen.getByLabelText(/패스워드/);
    const toggleButton = screen.getByRole("button");
    
    expect(input).toHaveAttribute("type", "password");
    expect(toggleButton).toBeDisabled();
    
    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute("type", "password");
  });

  it("accepts input value", () => {
    render(<PasswordInput />);
    
    const input = screen.getByLabelText(/패스워드/) as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: "test123" } });
    expect(input.value).toBe("test123");
  });

  it("renders with default value", () => {
    render(<PasswordInput defaultValue="defaultPassword" />);
    
    const input = screen.getByLabelText(/패스워드/) as HTMLInputElement;
    expect(input.value).toBe("defaultPassword");
  });

  it("handles disabled state correctly", () => {
    render(<PasswordInput disabled />);
    
    const input = screen.getByLabelText(/패스워드/);
    const toggleButton = screen.getByRole("button");
    
    expect(input).toBeDisabled();
    expect(toggleButton).toBeDisabled();
  });

  it("has proper accessibility attributes", () => {
    render(<PasswordInput />);
    
    const toggleButton = screen.getByRole("button");
    expect(toggleButton).toHaveAttribute("aria-label", "패스워드 보기");
    
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute("aria-label", "패스워드 숨기기");
  });
}); 