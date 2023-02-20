import {
  BaseTextFieldProps,
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import React, { FC, forwardRef, ReactNode, useCallback, useMemo } from 'react';

export enum AdornmentPosition {
  Start = 'start',
  End = 'end',
}

interface WithFlexWrapperProps {
  enabled: boolean;
  fullWidth?: boolean;
  children: ReactNode;
}

const WithFlexWrapper: FC<WithFlexWrapperProps> = ({ enabled, fullWidth, children }) => {
  if (!enabled) return <>{children}</>;

  return (
    <Box display="flex" width={fullWidth ? '100%' : 'auto'}>
      {children}
    </Box>
  );
};

interface SideButtonProps {
  customComponent?: React.ReactNode; // if custom component is set -> rest props ignores
  text: string;
  onClick: () => void;
  width?: string;
  height?: string;
  fontSize?: string;
  fontWeight?: string;
  disabled?: boolean;
}

/* interface EmojiPickerProps {
  show?: boolean;
  iconSize?: string;
  selectedEmoji?: string;
  onSelect?: (emojiCode: string) => void;
  onDeselect?: () => void;
} */

interface TextFieldProps {
  label?: string;
  name?: string;
  value?: string | number;
  errorText?: string;
  type?: string;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  onChange: (value: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  onEnterPress?: () => void;
  setFieldTouched?: (name: string, isTouched: boolean) => void;
  autocapitalize?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  adornmentPosition?: AdornmentPosition;
  adornment?: string | JSX.Element;
  readOnly?: boolean;
  focused?: boolean;
  placeholder?: string;
  helperText?: boolean;
  multiline?: boolean;
  rows?: number;
  className?: string;
  buttonProps?: SideButtonProps;
  /*   emojiPickerProps?: EmojiPickerProps; */
  inputRef?: BaseTextFieldProps['inputRef'];
  dataAttr?: string;
}

// eslint-disable-next-line react/display-name
export const TextFieldComponent = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      name,
      value,
      errorText,
      type = 'text',
      setFieldTouched,
      onChange,
      onEnterPress,
      onBlur = () => ({}),
      autocapitalize = false,
      disabled = false,
      fullWidth = false,
      readOnly = false,
      focused = false,
      adornmentPosition = AdornmentPosition.Start,
      adornment,
      placeholder,
      helperText,
      multiline,
      rows,
      className,
      buttonProps,
      /*  emojiPickerProps, */
      inputRef,
      dataAttr,
    },
    ref,
  ) => {
    /*     const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false); */

    /*   const showEmojiPicker = useMemo(
      () => emojiPickerProps && emojiPickerProps.show,
      [emojiPickerProps],
    ); */

    const showSideButton = !!buttonProps;

    const sideButtonAdornment = useCallback(() => {
      if (!showSideButton || !buttonProps) return <></>;

      const paddingGapToRemove = '13px';

      return (
        <InputAdornment
          position="end"
          style={{
            marginRight: `-${paddingGapToRemove}`,
            color: 'white',
          }}
        >
          {buttonProps.customComponent || (
            <Button
              onClick={buttonProps.onClick}
              style={{
                width: buttonProps.width || 'auto',
                height: buttonProps.height || '40px',
                borderRadius: '10px',
              }}
              color="primary"
              variant="contained"
              size="large"
              disabled={buttonProps.disabled}
            >
              <Typography
                color={'#fff' /* theme.palette.common.white */}
                fontSize={buttonProps.fontSize || '14px'}
                fontWeight={buttonProps.fontWeight || '600'}
              >
                {buttonProps.text}
              </Typography>
            </Button>
          )}
        </InputAdornment>
      );
    }, [buttonProps, showSideButton]);

    /*  const emojiPickerAdornment = useCallback(() => {
      return (
        <InputAdornment
          position="start"
          style={{
            margin: 0,
            color: 'white',
          }}
        >
          <Box
            display="flex"
            justifyContent="center"
            width={emojiPickerProps?.iconSize || '20px'}
            onClick={(e) => {
              e.stopPropagation();
              setIsEmojiPickerOpen((v) => !v);
            }}
          >
            {emojiPickerProps?.selectedEmoji ? (
              <Emoji code={emojiPickerProps?.selectedEmoji} />
            ) : (
              <EmojiPickerButton active={isEmojiPickerOpen} />
            )}
          </Box>
        </InputAdornment>
      );
    }, [emojiPickerProps?.iconSize, emojiPickerProps?.selectedEmoji, isEmojiPickerOpen]); */

    const AdornmentBlock = useMemo(() => {
      const key = adornmentPosition === AdornmentPosition.Start ? 'startAdornment' : 'endAdornment';

      const adornmentValue = adornment
        ? {
            [key]: <InputAdornment position={adornmentPosition}>{adornment}</InputAdornment>,
            readOnly,
          }
        : { readOnly };

      /*  if (showEmojiPicker) {
        adornmentValue.startAdornment = emojiPickerAdornment();
      } */

      if (showSideButton) {
        adornmentValue.endAdornment = sideButtonAdornment();
      }

      return adornmentValue;
    }, [adornment, adornmentPosition, readOnly, showSideButton, sideButtonAdornment]);

    const autoCompleteOnPassword = useMemo(
      () =>
        type === 'password'
          ? {
              autoComplete: 'new-password',
            }
          : {},
      [type],
    );

    /*  const clearEmojiOnBackspaceKeyPress = useMemo(
      () => ({
        onKeyDown: (key: React.KeyboardEvent<HTMLInputElement>) => {
          if (!value && key.code === 'Backspace') {
            emojiPickerProps?.onDeselect?.();
          }
        },
      }),
      [emojiPickerProps, value],
    );
 */
    const labelValue = useMemo(
      () => (helperText ? '' : errorText || label),
      [errorText, label, helperText],
    );

    const onBlurHandler = (event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      if (setFieldTouched && name) {
        setFieldTouched(name, true);
      }
      onBlur(event);
    };

    const onChangeHandler = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (autocapitalize && e.target.value.length === 1) {
          e.target.value = e.target.value.toUpperCase();
        }
        onChange?.(e);
      },
      [autocapitalize, onChange],
    );

    return (
      // Need add flex wrapper for right-side button support.
      // If no buttonProps provided -> don't wrap to save existing layouts
      <WithFlexWrapper enabled={!!buttonProps} fullWidth={fullWidth}>
        <Box position="relative">
          {/* {emojiPickerProps && (
            <EmojiPicker
              show={isEmojiPickerOpen}
              previewPosition="none"
              onEmojiSelect={({ shortcodes }) => emojiPickerProps?.onSelect?.(shortcodes)}
              onClickOutside={() => setIsEmojiPickerOpen(false)}
              containerProps={{
                position: 'absolute',
                top: '48px',
              }}
            />
          )} */}
        </Box>
        <TextField
          disabled={disabled}
          name={name}
          error={Boolean(errorText)}
          label={labelValue}
          value={value}
          type={type}
          variant="outlined"
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
          fullWidth={fullWidth}
          InputProps={AdornmentBlock}
          placeholder={placeholder}
          inputProps={{
            ...autoCompleteOnPassword,
            /*  ...clearEmojiOnBackspaceKeyPress, */
            /*  style: {
              paddingLeft: showEmojiPicker ? '10px' : undefined,
            }, */
          }}
          focused={focused}
          helperText={helperText ? errorText : ''}
          multiline={multiline}
          rows={rows}
          className={className}
          onKeyDown={(key) => {
            if (key.code === 'Enter') {
              onEnterPress?.();
            }
          }}
          ref={ref}
          inputRef={inputRef}
          data-attr={dataAttr}
        />
      </WithFlexWrapper>
    );
  },
);
