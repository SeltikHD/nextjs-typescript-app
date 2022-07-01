export function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.substring(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

export type StringAvatarProps = {
    name?: string | null;
    width?: string | number;
    height?: string | number;
};

export function stringAvatar({ name = '= D', width, height }: StringAvatarProps) {
    const rawInitials = name ? name.split(' ') : '= D'.split(' ');
    return {
        sx: {
            width,
            height,
            bgcolor: stringToColor(name ? name : 'default'),
        },
        children: rawInitials.length === 1 ? rawInitials[0][0] : `${rawInitials[0][0]}${rawInitials[1][0]}`,
    };
}

export type UserAvatarProps = {
    name?: string | null;
    width?: string | number;
    height?: string | number;
    icon?: string | null;
};

export function userAvatar({ name = '= D', width, height, icon }: UserAvatarProps) {
    const stringAvatarResult = stringAvatar({ name, width, height });
    return icon
        ? {
              alt: name ? name : 'User Icon',
              src: icon,
              sx: { width, height },
          }
        : {
              ...stringAvatarResult,
          };
}
