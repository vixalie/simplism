import { Flex } from './Flex';

export function Group({ children }: PropsWithChildren<unknown>) {
  return (
    <Flex direction="row" justify="flex-start" align="stretch" gap="none" className="control_group">
      {children}
    </Flex>
  );
}
