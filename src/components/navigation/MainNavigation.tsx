import ROUTES from "../routing/routes";
import css from "./styles.module.scss";
import { NavLink } from "react-router";
import CustomerIcon from '@assets/images/customer.svg?react';
import InquiryIcon from '@assets/images/inquiry.svg?react';
import ManagerIcon from '@assets/images/manager.svg?react';
import ProductIcon from '@assets/images/product.svg?react';

export default function MainNavigation() {
    return (
        <aside className={css.sidebar}>
            <div className={css.sidebarBrand}>
                <NavLink to={ROUTES.HOME}>
                    <span>Dash</span>Stack
                </NavLink>
            </div>
            <nav>
                <ul className={css.list}>
                    <li>
                        <NavLink
                            to={ROUTES.INQUIRIES}
                            className={({ isActive }) =>
                                isActive ? css.active : undefined
                            }
                        >
                            <div className={css.itemWrapper}>
                                <InquiryIcon fill="#202224" width="24" height="24" />
                                <div>Inquires</div>
                            </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={ROUTES.PRODUCTS}
                            className={({ isActive }) =>
                                isActive ? css.active : undefined
                            }
                        >
                            <div className={css.itemWrapper}>
                                <ProductIcon fill="#202224" width="24" height="24" />
                                <div>Produtcs</div>
                            </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={ROUTES.MANAGERS}
                            className={({ isActive }) =>
                                isActive ? css.active : undefined
                            }
                        >
                            <div className={css.itemWrapper}>
                                <ManagerIcon fill="#202224" width="24" height="24" />
                                <div>Managers</div>
                            </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={ROUTES.CUSTOMERS}
                            className={({ isActive }) =>
                                isActive ? css.active : undefined
                            }
                        >
                            <div className={css.itemWrapper}>
                                <CustomerIcon fill="#202224" width="24" height="24" />
                                <div>Customers</div>
                            </div>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}