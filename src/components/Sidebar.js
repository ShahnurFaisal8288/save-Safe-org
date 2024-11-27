
function Sidebar() {
    return (
        <div>
            <div id="settings-trigger"><i className="icon-settings"></i></div>
            <div id="theme-settings" className="settings-panel">
                <i className="settings-close icon-close"></i>
                <p className="settings-heading">SIDEBAR SKINS</p>
                <div className="sidebar-bg-options selected" id="sidebar-default-theme">
                    <div className="img-ss rounded-circle bg-dark border me-3"></div>Default
                </div>
                <div className="sidebar-bg-options" id="sidebar-light-theme">
                    <div className="img-ss rounded-circle bg-light border me-3"></div>Light
                </div>
                <p className="settings-heading mt-2">HEADER SKINS</p>
                <div className="color-tiles mx-0 px-4">
                    <div className="tiles dark"></div>
                    <div className="tiles default light"></div>
                </div>
            </div>
            <nav className="sidebar sidebar-offcanvas" id="sidebar">
                <ul className="nav">
                    <li className="nav-item navbar-brand-mini-wrapper">
                        <a className="nav-link navbar-brand brand-logo-mini" href="index-2.html"><img src="https://demo.bootstrapdash.com/stellar-admin-new/themes/assets/images/logo-mini.svg" alt="logo" /></a>
                    </li>
                    <li className="nav-item nav-profile">
                        <a href="#" className="nav-link">
                            <div className="profile-image">
                                <img className="img-xs rounded-circle" src="../assets/images/faces/face8.jpg" alt="profile image" />
                                <div className="dot-indicator bg-success"></div>
                            </div>
                            <div className="text-wrapper">
                                <p className="profile-name">Henry Klein</p>
                                <p className="designation">Administrator</p>
                            </div>
                            <div className="icon-container">
                                <i className="icon-bubbles"></i>
                                <div className="dot-indicator bg-danger"></div>
                            </div>
                        </a>
                    </li>
                    <li className="nav-item nav-category">
                        <span className="nav-link">Dashboard</span>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="index-2.html">
                            <span className="menu-title">Dashboard</span>
                            <i className="icon-screen-desktop menu-icon"></i>
                        </a>
                    </li>
                    <li className="nav-item nav-category"><span className="nav-link">Layouts</span></li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="collapse" href="#page-layouts" aria-expanded="false" aria-controls="page-layouts">
                            <span className="menu-title">Page Layouts</span>
                            <i className="icon-size-actual menu-icon"></i>
                        </a>
                        <div className="collapse" id="page-layouts">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item"> <a className="nav-link" href="pages/layout/boxed-layout.html">Boxed</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/layout/rtl-layout.html">RTL</a></li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="collapse" href="#sidebar-layouts" aria-expanded="false" aria-controls="sidebar-layouts">
                            <span className="menu-title">Sidebar Layouts</span>
                            <i className="icon-list menu-icon"></i>
                        </a>
                        <div className="collapse" id="sidebar-layouts">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item"> <a className="nav-link" href="pages/layout/compact-menu.html">Compact Menu</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/layout/sidebar-collapsed.html">Icon Menu</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/layout/sidebar-hidden.html">Sidebar Hidden</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/layout/sidebar-hidden-overlay.html">Sidebar Overlay</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/layout/sidebar-fixed.html">Sidebar Fixed</a></li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item nav-category"><span className="nav-link">UI Elements</span></li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                            <span className="menu-title">Basic UI Elements</span>
                            <i className="icon-layers menu-icon"></i>
                        </a>
                        <div className="collapse" id="ui-basic">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/accordions.html">Accordions</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/buttons.html">Buttons</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/badges.html">Badges</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/breadcrumbs.html">Breadcrumbs</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/dropdowns.html">Dropdowns</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/modals.html">Modals</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/progress.html">Progress Bar</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/pagination.html">Pagination</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/tabs.html">Tabs</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/typography.html">Typography</a></li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="collapse" href="#ui-advanced" aria-expanded="false" aria-controls="ui-advanced">
                            <span className="menu-title">Advanced UI</span>
                            <i className="icon-star menu-icon"></i>
                        </a>
                        <div className="collapse" id="ui-advanced">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/dragula.html">Dragula</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/clipboard.html">Clipboard</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/context-menu.html">Context Menu</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/slider.html">Slider</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/colcade.html">Colcade</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/carousel.html">Carousel</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/loaders.html">Loaders</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/tooltips.html">Tooltip</a></li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="pages/ui-features/popups.html">
                            <span className="menu-title">Popups</span>
                            <i className="icon-diamond menu-icon"></i>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="pages/ui-features/notifications.html">
                            <span className="menu-title">Notifications</span>
                            <i className="icon-bell menu-icon"></i>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="collapse" href="#icons" aria-expanded="false" aria-controls="icons">
                            <span className="menu-title">Icons</span>
                            <i className="icon-globe menu-icon"></i>
                        </a>
                        <div className="collapse" id="icons">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item"> <a className="nav-link" href="pages/icons/mdi.html">Material</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/icons/flag-icons.html">Flag Icons</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/icons/font-awesome.html">Font Awesome</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/icons/simple-line-icon.html">Simple Line Icons</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/icons/themify.html">Themify Icons</a></li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="collapse" href="#forms" aria-expanded="false" aria-controls="forms">
                            <span className="menu-title">Forms</span>
                            <i className="icon-book-open menu-icon"></i>
                        </a>
                        <div className="collapse" id="forms">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item"> <a className="nav-link" href="pages/forms/basic_elements.html">Form Elements</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/forms/advanced_elements.html">Advanced Forms</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/forms/validation.html">Validation</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/forms/wizard.html">Wizard</a></li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="pages/forms/text_editor.html">
                            <span className="menu-title">Text Editors</span>
                            <i className="icon-anchor menu-icon"></i>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="pages/forms/code_editor.html">
                            <span className="menu-title">Code Editors</span>
                            <i className="icon-mouse menu-icon"></i>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="collapse" href="#charts" aria-expanded="false" aria-controls="charts">
                            <span className="menu-title">Charts</span>
                            <i className="icon-chart menu-icon"></i>
                        </a>
                        <div className="collapse" id="charts">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item"> <a className="nav-link" href="pages/charts/chartjs.html">ChartJs</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/charts/morris.html">Morris</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/charts/flot-chart.html">Flot</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/charts/google-charts.html">Google Charts</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/charts/sparkline.html">Sparkline Js</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/charts/c3.html">C3 Charts</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/charts/chartist.html">Chartist</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/charts/justGage.html">JustGage</a></li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="collapse" href="#tables" aria-expanded="false" aria-controls="tables">
                            <span className="menu-title">Tables</span>
                            <i className="icon-grid menu-icon"></i>
                        </a>
                        <div className="collapse" id="tables">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item"> <a className="nav-link" href="pages/tables/basic-table.html">Basic Table</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/tables/data-table.html">Data Table</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/tables/js-grid.html">Js-grid</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/tables/sortable-table.html">Sortable Table</a></li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="collapse" href="#maps" aria-expanded="false" aria-controls="maps">
                            <span className="menu-title">Maps</span>
                            <i className="icon-location-pin menu-icon"></i>
                        </a>
                        <div className="collapse" id="maps">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item"> <a className="nav-link" href="pages/maps/google-maps.html">Google Maps</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/maps/mapael.html">Mapael</a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/maps/vector-map.html">Vector Map</a></li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item nav-category"><span className="nav-link">Extra Pages</span></li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="collapse" href="#auth" aria-expanded="false" aria-controls="auth">
                            <span className="menu-title">User Pages</span>
                            <i className="icon-disc menu-icon"></i>
                        </a>
                        <div className="collapse" id="auth">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item"> <a className="nav-link" href="pages/samples/login.html"> Login </a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/samples/login-2.html"> Login 2 </a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/samples/multi-level-login.html"> Multi Step Login </a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/samples/register.html"> Register </a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/samples/register-2.html"> Register 2 </a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/samples/lock-screen.html"> Lockscreen </a></li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="collapse" href="#error" aria-expanded="false" aria-controls="error">
                            <span className="menu-title">Error Pages</span>
                            <i className="icon-flag menu-icon"></i>
                        </a>
                        <div className="collapse" id="error">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item"> <a className="nav-link" href="pages/samples/error-404.html"> 404 </a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/samples/error-500.html"> 500 </a></li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="collapse" href="#general-pages" aria-expanded="false" aria-controls="general-pages">
                            <span className="menu-title">General Pages</span>
                            <i className="icon-doc menu-icon"></i>
                        </a>
                        <div className="collapse" id="general-pages">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item"> <a className="nav-link" href="pages/samples/blank-page.html"> Blank Page </a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/samples/profile.html"> Profile </a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/samples/faq.html"> FAQ </a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/samples/faq-2.html"> FAQ 2 </a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/samples/news-grid.html"> News Grid </a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/samples/timeline.html"> Timeline </a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/samples/search-results.html"> Search Results </a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/samples/portfolio.html"> Portfolio </a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/samples/user-listing.html"> User Listing </a></li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="collapse" href="#e-commerce" aria-expanded="false" aria-controls="e-commerce">
                            <span className="menu-title">E-commerce</span> <i className="icon-briefcase menu-icon"></i>
                        </a>
                        <div className="collapse" id="e-commerce">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item"> <a className="nav-link" href="pages/samples/invoice.html"> Invoice </a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/samples/pricing-table.html"> Pricing Table </a></li>
                                <li className="nav-item"> <a className="nav-link" href="pages/samples/orders.html"> Orders </a></li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item nav-category"><span className="nav-link">Applications</span></li>
                    <li className="nav-item">
                        <a className="nav-link" href="pages/apps/email.html">
                            <span className="menu-title">E-mail</span>
                            <i className="icon-envelope menu-icon"></i>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="pages/apps/calendar.html">
                            <span className="menu-title">Calendar</span>
                            <i className="icon-calendar menu-icon"></i>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="pages/apps/gallery.html">
                            <span className="menu-title">Gallery</span>
                            <i className="icon-camera menu-icon"></i>
                        </a>
                    </li>
                    <li className="nav-item nav-category"><span className="nav-link">Help</span></li>
                    <li className="nav-item">
                        <a className="nav-link" href="https://demo.bootstrapdash.com/stellar-admin-new/docs/documentation.html" target="_blank">
                            <span className="menu-title">Documentation</span>
                            <i className="icon-folder-alt menu-icon"></i>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
       
    );
}

export default Sidebar