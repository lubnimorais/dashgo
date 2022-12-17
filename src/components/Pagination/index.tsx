import { useMemo, useCallback } from 'react';
import { Stack, Box, Text } from '@chakra-ui/react';
import { PaginationItem } from './PaginationItem';

interface IPaginationProps {
  totalCountOfRegisters: number;
  registersPerPage?: number; // por padrão vai ser 10
  currentPage?: number; // por padrão vai ser 1
  onPageChange: (page: number) => void;
}

const siblingsCount = 1;

export function Pagination({
  totalCountOfRegisters,
  registersPerPage = 10,
  currentPage = 1,
  onPageChange,
}: IPaginationProps) {
  const lastPage = useMemo(() => {
    // vai arredondar sempre para cima
    return Math.ceil(totalCountOfRegisters / registersPerPage);
  }, [registersPerPage, totalCountOfRegisters]);

  const itemFirstPosition = useMemo(() => {
    if (currentPage === 1) {
      return 1;
    }

    return currentPage * registersPerPage - registersPerPage + 1;
  }, [currentPage, registersPerPage]);

  const itemLastPosition = useMemo(() => {
    return currentPage * registersPerPage;
  }, [currentPage, registersPerPage]);

  const generatePagesArray = useCallback((from: number, to: number) => {
    return [...new Array(to - from)]
      .map((_, index) => {
        return from + index + 1;
      })
      .filter(page => page > 0);
  }, []);

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : [];

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage),
        )
      : [];

  return (
    <Stack
      spacing="6"
      direction={['column', 'row']}
      marginTop="8"
      justify="space-between"
      align="center"
    >
      <Box>
        <strong>{itemFirstPosition}</strong> -{' '}
        <strong>{itemLastPosition}</strong> de{' '}
        <strong>{totalCountOfRegisters}</strong>
      </Box>

      <Stack direction="row" spacing="2">
        {/* mostrar a primeira página */}
        {currentPage > 1 + siblingsCount && (
          <>
            <PaginationItem number={1} onPageChange={onPageChange} />

            {currentPage > 2 + siblingsCount && (
              <Text width="8" textAlign="center" color="gray.300">
                ...
              </Text>
            )}
          </>
        )}

        {/* páginas anteriores */}
        {previousPages.length > 0 &&
          previousPages.map(page => {
            return (
              <PaginationItem
                key={page}
                number={page}
                onPageChange={onPageChange}
              />
            );
          })}

        <PaginationItem
          number={currentPage}
          isCurrent
          onPageChange={onPageChange}
        />

        {/* próximas páginas */}
        {nextPages.length > 0 &&
          nextPages.map(page => {
            return (
              <PaginationItem
                key={page}
                number={page}
                onPageChange={onPageChange}
              />
            );
          })}

        {/* mostrar a última página */}
        {currentPage + siblingsCount < lastPage && (
          <>
            {currentPage + 1 + siblingsCount < lastPage && (
              <Text width="8" textAlign="center" color="gray.300">
                ...
              </Text>
            )}

            <PaginationItem number={lastPage} onPageChange={onPageChange} />
          </>
        )}
      </Stack>
    </Stack>
  );
}
