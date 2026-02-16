'use client';

import { logout } from '@/app/(auth)/actions';
import {
  Burger,
  Button,
  Divider,
  Drawer,
  Group,
  NavLink,
  Tooltip,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import {
  IconBook2,
  IconBooks,
  IconLogout,
  IconProps,
  IconSettings,
  IconUsers,
} from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ForwardRefExoticComponent,
  RefAttributes,
  useLayoutEffect,
  useState,
} from 'react';

type SidebarItem = {
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
  label: string;
  href: string;
};

const itens: SidebarItem[] = [
  { icon: IconBooks, label: 'Estantes', href: '/estantes' },
  { icon: IconBook2, label: 'Livros', href: '/livros' },
  { icon: IconUsers, label: 'Amigos', href: '/amigos' },
  { icon: IconSettings, label: 'Configurações', href: '/configuracoes' },
];

export const Sidebar = () => {
  const [activeLink, setActiveLink] = useState<SidebarItem['label']>('');
  const [opened, { toggle, close }] = useDisclosure();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const pathname = usePathname();

  useLayoutEffect(() => {
    const currentItem = itens.find((item) => pathname.startsWith(item.href));
    setActiveLink(currentItem ? currentItem.label : itens[0].label);
  }, [pathname]);

  const handleLogout = async () => {
    await logout();
  };

  // =============================
  // MOBILE
  // =============================
  if (isMobile) {
    return (
      <>
        <Burger
          opened={opened}
          onClick={toggle}
          bg="white"
          className="bg-gray-800 absolute top-4 left-4 z-50"
        />

        <Drawer opened={opened} onClose={close} size="100%" padding="md">
          <nav className="space-y-1 mt-10">
            {itens.map((item) => (
              <NavLink
                key={item.label}
                component={Link}
                href={item.href}
                leftSection={<item.icon size={20} />}
                label={item.label}
                active={activeLink === item.label}
                onClick={close}
              />
            ))}
          </nav>

          <Button
            variant="light"
            color="red"
            leftSection={<IconLogout size={20} />}
            className="mt-auto"
            fullWidth
            onClick={handleLogout}
          >
            Sair
          </Button>
        </Drawer>
      </>
    );
  }

  // =============================
  // DESKTOP
  // =============================
  return (
    <nav
      className={`
        left-0 top-0 h-full bg-white shadow-md z-40
        transition-all duration-300
        sticky
        ${opened ? 'min-w-64 w-64' : 'min-w-16 w-16'}
        flex flex-col
      `}
    >
      {/* Navigation */}
      <Group justify="" className="p-4 overflow-hidden flex-nowrap">
        <Burger opened={opened} onClick={toggle} size="sm" />
      </Group>

      <Divider />

      <Group className="px-2 py-3 space-y-0" gap="xs" justify="flex-start">
        {itens.map((item) => {
          const link = (
            <NavLink
              key={item.label}
              component={Link}
              href={item.href}
              leftSection={<item.icon size={24} />}
              label={item.label}
              active={activeLink === item.label}
              pr={0}
              className="justify-center h-10 rounded-sm font-semibold"
            />
          );

          return (
            <Tooltip
              key={item.label}
              label={item.label}
              position="right"
              events={{ hover: !opened, focus: !opened, touch: !opened }}
            >
              {link}
            </Tooltip>
          );
        })}
      </Group>

      <Group className="p-2 mb-2 absolute bottom-0 w-full">
        <Tooltip
          label="Sair"
          position="right"
          events={{ hover: !opened, focus: !opened, touch: !opened }}
        >
          <Button
            variant="light"
            color="red"
            fullWidth
            leftSection={<IconLogout size={24} />}
            className="pr-0!"
            onClick={handleLogout}
          >
            Sair
          </Button>
        </Tooltip>
      </Group>
    </nav>
  );
};
