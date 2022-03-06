import { ElementType } from 'react';

import {
  Icon,
  Link,
  Text,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react';

interface INavLinkProps extends ChakraLinkProps {
  icon: ElementType; // ElementType é quando passamos um component, quando passa o nome do componente (a referencia do componente e não a declaração <Component />)
  children: string;
}

export function NavLink({ icon, children, ...rest }: INavLinkProps) {
  return (
    <Link href="/" display="flex" alignItems="center" {...rest}>
      <Icon as={icon} fontSize="20" />
      <Text marginLeft="4" fontWeight="medium">
        {children}
      </Text>
    </Link>
  );
}
