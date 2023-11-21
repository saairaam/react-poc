import * as RadixDialog from '@radix-ui/react-dialog';
import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  triggerClassName?: string;
  Content: React.ReactNode[] | React.ReactNode | any;
  overlayClassName?: string;
  containerClassName?: string;
  // For Controlled Dialogs
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onInteractOutside?: any;
  backgroundImage?: any;
  onClick?: any;
}

const Dialog = (props: PropsWithChildren<Props>) => {
  const {
    children,
    triggerClassName,
    open,
    onOpenChange,
    Content,
    overlayClassName,
    containerClassName,
    onInteractOutside,
    backgroundImage,
    onClick,
  } = props;

  const backgoundStyle = backgroundImage
    ? {
        backgroundImage: backgroundImage,
        opacity: '70%',
        backgroundPositionX: 'center',
        backgroundPositionY: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }
    : {};

  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      {children && (
        <RadixDialog.Trigger className={twMerge('w-full', triggerClassName)}>
          {children}
        </RadixDialog.Trigger>
      )}
      <RadixDialog.Portal>
        <RadixDialog.Overlay
          style={backgoundStyle}
          className={twMerge('fixed top-0 left-0 z-20 h-full w-full bg-black', overlayClassName)}
        />
        <RadixDialog.Content
          className={twMerge(
            'fixed top-1/2 left-1/2 z-50 w-full max-w-xl -translate-x-1/2 -translate-y-1/2',
            containerClassName
          )}
          onInteractOutside={onInteractOutside}
          onClick={onClick}
        >
          {Content}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};

Dialog.Title = RadixDialog.Title;
Dialog.Description = RadixDialog.Description;
Dialog.Close = RadixDialog.Close;

export default Dialog;
