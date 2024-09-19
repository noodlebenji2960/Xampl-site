import React, { useEffect, useState } from "react";
import "./Header.css";
import Logo from "./Logo";
import { useScroll } from "../contexts/ScrollContext";

type NavItem = {
  label: string;
  href?: string;
  children?: NavItem[];
};

const Header: React.FC = () => {
  const { scrollY, scrollThresholdTop } = useScroll();
  const [isHovering, setIsHovering] = useState();
  const [expandedHeader, setExpandedHeader] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(()=>{
    if(scrollY <= scrollThresholdTop){
      setExpandedHeader(true)
    }else{
      setExpandedHeader(false)
    }

  },[scrollY, scrollThresholdTop])

  const navItems: NavItem[] = [
    {
      label: "Services",
      href: "/services",
      children: [
        {
          label: "Web Development",
          href: "/services/web-development",
          children: [
            {
              label: "Frontend Development",
              href: "/services/web-development/frontend",
              children: [],
            },
            {
              label: "Backend Development",
              href: "/services/web-development/backend",
              children: [],
            },
            {
              label: "Full-Stack Development",
              href: "/services/web-development/fullstack",
              children: [],
            },
          ],
        },
        {
          label: "App Development",
          href: "/services/app-development",
          children: [],
        },
        {
          label: "SEO Optimization",
          href: "/services/seo-optimization",
          children: [],
        },
      ],
    },
    {
      label: "About",
      href: "/about",
      children: [
        {
          label: "Company",
          href: "/about/company",
          children: [
            { label: "History", href: "/about/company/history", children: [] },
            { label: "Mission", href: "/about/company/mission", children: [] },
            {
              label: "Leadership",
              href: "/about/company/leadership",
              children: [
                {
                  label: "CEO",
                  href: "/about/company/leadership/ceo",
                  children: [],
                },
                {
                  label: "CTO",
                  href: "/about/company/leadership/cto",
                  children: [],
                },
              ],
            },
          ],
        },
        { label: "Team", href: "/about/team", children: [] },
        { label: "Careers", href: "/about/careers", children: [] },
      ],
    },
    {
      label: "Contact",
      href: "/contact",
      children: [],
    },
  ];

  // Helper function to check if any children have their own children
  const hasChildrenWithChildren = (item: NavItem): boolean => {
    return (
      item.children?.some(
        (child) => child.children && child.children.length > 0
      ) || false
    );
  };

  const NavItems: React.FC<{ navItems: NavItem[]; expandAll: boolean }> = ({
    navItems,
    expandAll,
  }) => {
    const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});
  
    const expandItem = (label: string) => {
      setExpandedItems((prevState) => ({
        ...prevState,
        [label]: true,
      }));
    };
  
    const collapseItem = (label: string) => {
      setExpandedItems((prevState) => ({
        ...prevState,
        [label]: false,
      }));
    };
  
    React.useLayoutEffect(() => {
      const newExpandedItems: { [key: string]: boolean } = {};
      navItems.forEach((item) => {
        if (hasChildrenWithChildren(item)) {
          newExpandedItems[item.label] = expandAll;
        }
      });
      setExpandedItems(newExpandedItems);
    }, [expandAll, navItems]);
  
    // Separate items with children and without children
    const itemsWithChildren = navItems.filter((item) => item.children && item.children.length > 0);
    const itemsWithoutChildren = navItems.filter((item) => !item.children || item.children.length === 0);
  
    return (
      <>
        {/* Render items without children first */}
        {itemsWithoutChildren.map((item) => (
          <li key={item.label} className="nav-item">
            <a href={item.href} className="nav-link">
              {item.label}
            </a>
          </li>
        ))}
  
        {/* Render items with children after */}
        {itemsWithChildren.map((item) => (
          <li
            key={item.label}
            className="nav-item"
            onMouseEnter={() => expandItem(item.label)}
            onMouseLeave={() => collapseItem(item.label)}
          >
            <label onMouseOver={()=>setIsHovering(true)} className={`nav-label ${expandedItems[item.label] ? 'expanded' : ''}`} >
              {item.label}
            </label>
            <ul className={`sub-nav-list ${expandedItems[item.label] ? 'expanded' : 'collapsed'}`}>
              <NavItems navItems={item.children} expandAll={expandAll} />
            </ul>
          </li>
        ))}
      </>
    );
  };
  
  return (
    <header
      className={`header ${expandedHeader ? "expandedHeader" : ""}`}
      onMouseLeave={()=>{setExpanded(false); setIsHovering(false)}}
    >
      <div className="header-content">
        <Logo />
        <h1 className="site-title">Xampl</h1>
      </div>
      <nav className="nav">
        <ul className="nav-list" onMouseLeave={()=>setIsHovering(false)}>
          <NavItems navItems={navItems} expandAll={expanded} />
        </ul>
      </nav>
      <Hamburger active={expanded || isHovering} setExpandAll={setExpanded}/>
    </header>
  );
};

const Hamburger = ({ active, setExpandAll, }) => {
  return (
    <button
      className={`hamburger fat ${active ? "clicked" : ""}`}
      onClick={() => setExpandAll((prev) => !prev)}
    >
      <div className="line bun bun-top"></div>
      <div className="line ham"></div>
      <div className="line bun bun-bottom"></div>
    </button>
  );
};

export default Header;
