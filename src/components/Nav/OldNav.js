import React from 'react';
import Link from 'gatsby-link';
import Sharing from '../Sharing';

const TEST_ARTICLES = [];

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      links: [
        {
          title: 'Home',
          href: '/homepage',
          active: false
        },
        {
          title: 'About',
          href: '#about',
          active: false
        },
        {
          title: 'FAQ',
          href: '/faq',
          active: false
        }
      ],
      articlesNews: TEST_ARTICLES,
      searchResults: {
        values: [],
        state: false
      }
    };
    this.activateSearch = this.activateSearch.bind(this);
  }

  activateSearch(value) {
    if (value.length === 0) {
      this.setState(() => ({
        searchResults: {
          state: false,
          values: []
        }
      }));
      return;
    }
    const results = [];
    this.state.articlesNews.forEach(news => {
      if (news.name.indexOf(value) !== -1) {
        results.push(news);
      }
    });
    this.setState(() => ({
      searchResults: {
        state: true,
        values: results
      }
    }));
  }

  activateExtrimSearch(value) {
    return value;
  }

  openAbout() {
    console.log('About modal must be opened!');
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {this.state.links.map(link => (
              link.href === '#about' ?
                <li key={link.href} className={link.active ? +'nav-item' : 'nav-item'}>
                  <button onClick={this.openAbout}>Look on {link.title}</button>
                </li> :
                <li key={link.href} className={link.active ? +'nav-item' : 'nav-item'}>
                  <Link to={link.href}>{link.title}</Link>
                </li>
            ))}
            <li className="brand-area">
              <a
                href="/"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                className="navbar-brand"
              >Vpershe
              </a>
              <span className="navbar-toggler-icon" />
            </li>
          </ul>
          <Sharing />
          <div className="start-search">
            <div className="row">
              <div className="col-md-6">
                <p>search for actual articles</p>
                <form className="form-inline">
                  <input
                    onKeyPress={e => {
                      this.activateSearch(e.target.value);
                    }}
                    id="searchValue"
                    className="inpt-round form-control"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                </form>
                {this.state.searchResults.state ?
                  <div className="search-results">
                    <div className="row">
                      <div className="col-md-12">
                        <ul className="dropdown">
                          {this.state.searchResults.values.map((val, index) => (
                            <li key={index}>
                              <Link to={val.href || ''}>{val.name}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div> :
                  false
                }
              </div>
              <div className="col-md-6">
                <p>typing your problem question</p>
                <form className="form-inline">
                  <input
                    onKeyPress={e => {
                      this.activateExtrimSearch(e.target.value);
                    }}
                    id="extrimSearchValue"
                    className="inpt-round form-control"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
