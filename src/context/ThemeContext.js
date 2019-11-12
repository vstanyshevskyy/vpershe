import React from 'react';

const defaultState = {
  isDarkModeEnabled: false,
  toggleDark: () => {}
};

const ThemeContext = React.createContext(defaultState);

const supportsDarkMode = () => !!window.matchMedia('(prefers-color-scheme: dark)').matches;

class ThemeProvider extends React.Component {
  state = {
    isDarkModeEnabled: false
  }

  componentDidMount() {
    // Getting dark mode value from localStorage!
    const lsDark = JSON.parse(localStorage.getItem('isDarkModeEnabled'));
    if (lsDark !== null) {
      this.setState({ isDarkModeEnabled: lsDark });
    } else if (supportsDarkMode()) {
      this.setState({ isDarkModeEnabled: true });
    }
  }

  toggleDark = () => {
    let { isDarkModeEnabled } = this.state;
    isDarkModeEnabled = !isDarkModeEnabled;
    localStorage.setItem('isDarkModeEnabled', JSON.stringify(isDarkModeEnabled));
    this.setState({ isDarkModeEnabled });
  }

  render() {
    const { children } = this.props;
    const { isDarkModeEnabled } = this.state;
    return (
      <ThemeContext.Provider
        value={{
          isDarkModeEnabled,
          toggleDark: this.toggleDark
        }}
      >
        {children}
      </ThemeContext.Provider>
    );
  }
}
export default ThemeContext;
export { ThemeProvider };
