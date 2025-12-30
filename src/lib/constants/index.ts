import Logo from "$lib/components/icons/logo.svelte";
import type { iFetchMeta } from "$lib/interface";
import { FileText, LayoutDashboard, User, Users, Home, Book, Music, Heart, Globe, Lightbulb, Cross, Settings, PackageOpen, Star, Boxes, Image, Tag, Ruler, LineChart } from "@lucide/svelte";

export enum Role {
  ADMIN = 'admin',
  EDITOR = 'editor',
  USER = 'user',
}

export enum Fields { USER = 'user' }

export const MAX_ITEMS_PER_PAGE = 12;

export enum Constants {
  BRANDNAME = 'ecommerce',
  CREDENTIAL = 'credential',
  GOOGLE = 'google',
  AFTERAUTH = '/dashboard',
  SUPPORTEMAIL = 'support@ecommerce.com',
  BRANDWEBSITE = 'https://ecommerce.com',
}

export type FileType = 'audio' | 'video' | 'file' | 'image';

// Site Meta for SEO/OG tags
export const SiteMeta = {
  title: 'ecommerce',
  description: 'Welcome to ecommerce - Your trusted platform',
  keywords: ['ecommerce', 'platform', 'app'],
  ogimage: '/screenshot-wide.webp',
  link: 'https://ecommerce.com',
};

// Homepage configurable content
export const HomepageContent = {
  hero: {
    subtitle: 'ecommerce',
    title: 'Build Something Amazing',
    description: 'A modern platform designed to help you achieve your goals with powerful tools and seamless experiences.',
    primaryCta: { text: 'Get Started', href: '/auth/login?redirectTo=/dashboard' },
    secondaryCta: { text: 'Learn More', href: '#features' },
    loggedInCta: { text: 'Dashboard', href: '/dashboard' },
    backgroundImage: '/hero-bg.webp',
  },
  stats: [
    { value: '1000+', label: 'Active Users', emoji: '👥', gradient: 'from-pink-500 to-rose-500' },
    { value: '50+', label: 'Team Members', emoji: '❤️', gradient: 'from-[#f71002] to-[#fd6c02]' },
    { value: '24/7', label: 'Support', emoji: '🎯', gradient: 'from-cyan-500 to-blue-500' },
    { value: '100%', label: 'Satisfaction', emoji: '✨', gradient: 'from-emerald-500 to-teal-500' },
  ],
  features: {
    badge: 'What We Do',
    title: 'Excellence in Every Detail',
    description: 'Our platform provides a comprehensive experience designed to meet your needs.',
    items: [
      { icon: Book, title: 'Documentation', description: 'Comprehensive guides and resources to help you get started quickly', gradient: 'from-[#f71002] to-pink-500' },
      { icon: Music, title: 'Easy Integration', description: 'Seamlessly integrate with your existing tools and workflows', gradient: 'from-cyan-500 to-blue-500' },
      { icon: Users, title: 'Collaboration', description: 'Work together with your team in real-time', gradient: 'from-[#fd6c02] to-yellow-500' },
      { icon: Heart, title: 'Support', description: 'Dedicated support team ready to help you succeed', gradient: 'from-emerald-500 to-teal-500' },
    ],
  },
  mission: {
    badge: 'Our Vision',
    title: 'Empowering Your Success',
    description: 'We exist to provide exceptional tools and services that transform the way you work and achieve your goals.',
    values: [
      { icon: Cross, title: 'Quality First', description: 'Committed to delivering the highest quality in everything we do', gradient: 'from-[#f71002] to-pink-500' },
      { icon: Globe, title: 'Global Reach', description: 'Accessible to users around the world with localized support', gradient: 'from-cyan-500 to-blue-500' },
      { icon: Lightbulb, title: 'Innovation', description: 'Constantly evolving to bring you the latest features', gradient: 'from-[#fd6c02] to-yellow-500' },
    ],
    coreValues: ['Excellence', 'Innovation', 'Reliability', 'Security', 'Support'],
  },
  cta: {
    badge: 'Get Started',
    title: 'Ready to Begin Your Journey?',
    description: 'Join thousands of users who trust our platform for their daily needs.',
    buttonText: 'Join Us Today',
  },
};

// Utility function for background images
export const getStyle = (imageUrl: string) => `background-image: url('${imageUrl}'); background-size: cover; background-position: center; background-repeat: no-repeat;`;

export const documentationRoles = [Role.ADMIN, Role.EDITOR, Role.USER];
export const dashboardRoles = [Role.ADMIN, Role.EDITOR, Role.USER];
export const usersRoles = [Role.ADMIN];
export const profileRoles = [Role.ADMIN, Role.EDITOR, Role.USER];
export const homeRoles = [Role.ADMIN, Role.EDITOR, Role.USER];

export const getNavigation = (reference: string) => {
  const isActive = (url: string) => reference.startsWith(url);

  const data = {
    teams: [
      {
        name: "Homepage",
        logo: Logo,
        plan: "ecommerce",
        url: "/"
      },
    ],
    navMain: [
      {
        title: "Documentation",
        url: "/documentation",
        roles: documentationRoles,
        icon: FileText,
        isActive: reference === "/documentation",
      },
      {
        title: "Dashboard",
        url: "/dashboard",
        roles: dashboardRoles,
        icon: LayoutDashboard,
        isActive: reference === "/dashboard",
      },
      {
        title: "Users",
        url: "/users",
        roles: usersRoles,
        icon: Users,
        isActive: reference === "/users",
      },
      {
        title: "Profile",
        url: "/profile",
        roles: profileRoles,
        icon: User,
        isActive: reference === "/profile",
      },
    ],
    admin: [
      {
        title: "Dashboard",
        url: "/admin",
        icon: LayoutDashboard,
        isActive: reference === "/admin",
      },
      {
        title: "Products",
        url: "/admin/products",
        icon: PackageOpen,
        isActive: reference.startsWith("/admin/products"),
      },
      {
        title: "Categories",
        url: "/admin/categories",
        icon: Boxes,
        isActive: reference.startsWith("/admin/categories"),
      },
      {
        title: "Orders",
        url: "/admin/orders",
        icon: FileText,
        isActive: reference.startsWith("/admin/orders"),
      },
      {
        title: "Customers",
        url: "/admin/customers",
        icon: Users,
        isActive: reference.startsWith("/admin/customers"),
      },
      {
        title: "Reviews",
        url: "/admin/reviews",
        icon: Star,
        isActive: reference.startsWith("/admin/reviews"),
      },
      {
        title: "Inventory",
        url: "/admin/inventory",
        icon: Boxes,
        isActive: reference.startsWith("/admin/inventory"),
      },
      {
        title: "Media",
        url: "/admin/media",
        icon: Image,
        isActive: reference.startsWith("/admin/media"),
      },
      {
        title: "Tags",
        url: "/admin/tags",
        icon: Tag,
        isActive: reference.startsWith("/admin/tags"),
      },
      {
        title: "Sizes",
        url: "/admin/sizes",
        icon: Ruler,
        isActive: reference.startsWith("/admin/sizes"),
      },
      {
        title: "Settings",
        url: "/admin/settings",
        icon: Settings,
        isActive: reference.startsWith("/admin/settings"),
      },
      {
        title: "Analytics",
        url: "/admin/analytics",
        icon: LineChart,
        isActive: reference.startsWith("/admin/analytics"),
      },
    ],
    publicNav: [
      { name: 'Home', href: '/', icon: Home, roles: homeRoles },
    ],
    privateNav: [
      { name: 'Home', href: '/', icon: Home, roles: homeRoles },
      { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: dashboardRoles },
    ],
  };

  return data;
};

export const adminRoles = [Role.ADMIN];

export const emptyMetalist: iFetchMeta = {
  total: 0,
  meta: { cursor: '', more: false, size: 0 },
  data: []
};
