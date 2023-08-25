import * as React from "react";
import Svg, {
  ClipPath,
  Defs,
  G,
  LinearGradient,
  Path,
  Stop,
  SvgXml,
} from "react-native-svg";
import { Image } from "react-native";

const apple = require("../assets/icons/apple-icon.svg");

export const MarvelLogo = (props: any) => {
  return (
    <Svg width='95' height='35' fill='none' viewBox='0 0 95 35' {...props}>
      <G clipPath='url(#clip0_2123_605)'>
        <Path
          fill={props.color || "#000"}
          d='M82.55 6.38V.006H65.196l-2.854 21.3-2.824-21.3H53.26l.7 5.684C53.239 4.233 50.677.005 45.038.005c-.037-.003-6.266 0-6.266 0l-.024 31.047L34.185.005 25.99 0 21.27 32.17 21.273.004h-7.844L10.6 18.075 7.847.004H0v34.973h6.18V18.121l2.81 16.857h3.285l2.771-16.857v16.857h11.912l.723-5.382h4.796l.72 5.382 11.695.007h.01v-.007h.014V23.625l1.434-.213 2.968 11.573H55.367l-.002-.007H55.383l-3.895-13.565c1.974-1.492 4.203-5.283 3.61-8.91v-.002c.006.05 3.676 22.499 3.676 22.499l7.194-.022 4.916-31.7v31.7H82.55v-6.29h-5.537v-8.021h5.537V14.28h-5.537v-7.9h5.537zM28.409 24.05L30.105 9.1l1.762 14.951h-3.458zm17.961-6.904a3.276 3.276 0 01-1.454.354V6.25l.03-.002c.484-.002 4.092.15 4.092 5.566 0 2.833-1.227 4.618-2.668 5.332zM95 28.683v6.29H83.62V0h6.127v28.683H95z'
        ></Path>
      </G>
      <Defs>
        <ClipPath id='clip0_2123_605'>
          <Path fill='#fff' d='M0 0H95V35H0z'></Path>
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export const MenuIcon = (props: any) => {
  return (
    <Svg width='24' height='24' fill='none' viewBox='0 0 24 24' {...props}>
      <Path
        stroke={props.color || "#000"}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M2 19.5h8.75M2 4.5h20H2zM2 12h20H2z'
      ></Path>
    </Svg>
  );
};

export const GlassIcon = (props: any) => {
  return (
    <Svg width='24' height='24' fill='none' viewBox='0 0 24 24' {...props}>
      <Path
        stroke={props.color || "#000"}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M22 22l-6.667-6.667L22 22zM17.556 9.778a7.777 7.777 0 11-15.554 0 7.777 7.777 0 0115.554 0z'
      ></Path>
    </Svg>
  );
};

export const ArrowBackIcon = (props: any) => {
  return (
    <Svg width='24' height='24' fill='none' viewBox='0 0 24 24' {...props}>
      <Path
        fill={props.color || "#000"}
        fillRule='evenodd'
        d='M9.134 17.876a1.25 1.25 0 01-1.768 0l-5-5a1.25 1.25 0 010-1.767l5-5a1.25 1.25 0 011.768 1.767l-2.867 2.866H20.75a1.25 1.25 0 010 2.5H6.267l2.867 2.867a1.25 1.25 0 010 1.767z'
        clipRule='evenodd'
      ></Path>
    </Svg>
  );
};

export const HeroIcon = (props: any) => {
  return (
    <Svg width='24' height='24' fill='none' viewBox='0 0 24 24' {...props}>
      <Path
        fill={props.color || "#000"}
        fillRule='evenodd'
        d='M13.777 5.346V4.67a.443.443 0 00-.357-.434 7.377 7.377 0 00-2.84.001.443.443 0 00-.357.435v.671a7.354 7.354 0 00-5.409 5.605L2.7 8.522c-.258-.33-.784-.078-.689.33l2.645 9.214v1.003a.697.697 0 001.018.61l6.01-3.091c.2-.103.437-.1.634.005l5.994 3.224a.698.698 0 001.028-.589c.003-.057.004-.113.004-.17v-.992l2.644-9.214c.096-.408-.43-.66-.688-.33l-2.125 2.438c-.593-2.741-2.696-4.935-5.398-5.614zM10.87 11.74v2.12a.61.61 0 01-.351.552l-1.989.928a.61.61 0 01-.671-.105l-1.714-1.583a.61.61 0 01-.135-.716l.717-1.464a.61.61 0 01.548-.342h2.986a.61.61 0 01.61.61zm6.988 1.912a.61.61 0 00.134-.716l-.717-1.464a.61.61 0 00-.548-.342H13.74a.61.61 0 00-.61.61v2.12a.61.61 0 00.352.552l1.989.928a.61.61 0 00.671-.105l1.715-1.583z'
        clipRule='evenodd'
      ></Path>
    </Svg>
  );
};

export const VillainIcon = (props: any) => {
  return (
    <Svg width='24' height='24' fill='none' viewBox='0 0 24 24' {...props}>
      <Path
        fill={props.color || "#000"}
        d='M12.274 2h-.602C7.61 2 4.344 5.017 4.344 8.726v3.83c0 1.256.781 2.382 2.03 2.76v2.42c0 2.39 4.338 4.264 5.143 4.264h.912c.805 0 5.196-1.873 5.196-4.265v-2.418c1.25-.379 2.031-1.505 2.031-2.76V8.726c0-3.71-3.319-6.726-7.382-6.726zm-.301 10.78c.693 0 1.073 1.766 1.073 2.352 0 .56-.322.636-.637.636-.062 0-.128-.002-.199-.005a6.144 6.144 0 00-.474 0c-.07.003-.137.005-.2.005-.15 0-.32-.014-.449-.119-.128-.104-.188-.268-.188-.517 0-.586.381-2.353 1.074-2.353zm-4.389-2.025c.274-.33.664-.529 1.1-.558l.69-.047c.921-.061 1.641.413 1.641 1.053 0 .613-.616 1.407-1.402 1.807l-.599.305a1.386 1.386 0 01-.63.161c-.583 0-1.01-.424-1.09-1.08l-.054-.457a1.55 1.55 0 01.344-1.184zm9.029 5.034l-1.488.505v.864c0 .022-.018.044-.022.065-.035.752-.71 1.183-1.835 1.183H10.63c-.88 0-1.755-.43-1.755-1.248v-.864l-1.512-.505a.315.315 0 01-.2-.396.31.31 0 01.393-.196l1.724.576a.32.32 0 01.22.297v1.088c0 .187.113.325.284.423a.329.329 0 01.325-.268c.172 0 .329.14.329.312v.14c0 .01.12.017.192.017h.432v-.157a.313.313 0 01.625 0v.157h.625v-.157a.313.313 0 01.625 0v.157h.33c.082 0 .139-.006.295-.013v-.144c0-.172.126-.312.299-.312.17 0 .3.135.304.303.18-.093.318-.236.318-.457 0-.02.017-.038.017-.057V16.07c0-.135.07-.254.197-.297l1.709-.576a.316.316 0 01.4.196.31.31 0 01-.193.396zm.284-3.85l-.054.457c-.08.656-.507 1.08-1.09 1.08-.207 0-.418-.054-.63-.162l-.598-.304c-.787-.4-1.403-1.194-1.403-1.807 0-.64.722-1.114 1.642-1.053l.69.047a1.55 1.55 0 011.443 1.742z'
      ></Path>
    </Svg>
  );
};

export const AntiHeroIcon = (props: any) => {
  return (
    <Svg width='24' height='24' fill='none' viewBox='0 0 24 24' {...props}>
      <Path
        fill={props.color || "#000"}
        d='M8.208 11.48l.005-.028-2.87.621-3.044-3.387.871-.783 2.59 2.881 2.898-.627c.168-.301.376-.576.616-.819l-2.06-.507L5.412 5.5l1.03-.558 1.557 2.874 2.296.565a1.941 1.941 0 01-.3-2.712 1.754 1.754 0 01-.606-1.327c0-.97.788-1.758 1.758-1.758h.112v1.172h-.112a.587.587 0 000 1.172h1.708a.587.587 0 000-1.172h-.112V2.585h.112c.97 0 1.758.789 1.758 1.758 0 .529-.235 1.004-.606 1.327a1.941 1.941 0 01-.3 2.713l2.296-.566 1.557-2.874 1.03.559-1.804 3.329-2.06.507c.24.243.449.518.617.819l2.899.627 2.589-2.881.871.783-3.043 3.387-2.87-.621a1.632 1.632 0 01.012.08l.052.396c-.253.367-.709.704-1.303.957-.736.315-1.617.48-2.549.48-.932 0-1.813-.165-2.549-.48-.594-.253-1.05-.59-1.303-.957l.052-.397.008-.05zM21.598 14.265l.402 1.1-3.11 1.136-2.625-1.428.17 1.287a4.473 4.473 0 11-8.87 0l.17-1.287-2.625 1.428L2 15.366l.402-1.101 2.613.954 2.909-1.582.033-.258c.297.221.643.417 1.034.584.88.376 1.92.574 3.009.574 1.088 0 2.13-.198 3.01-.574.39-.167.736-.363 1.033-.584l.033.258 2.909 1.582 2.613-.954z'
      ></Path>
    </Svg>
  );
};

export const AlienIcon = (props: any) => {
  return (
    <Svg width='24' height='24' fill='none' viewBox='0 0 24 24' {...props}>
      <Path
        fill={props.color || "#000"}
        fillRule='evenodd'
        d='M12 2c-4.825 0-8.75 3.925-8.75 8.75C3.25 15.28 6.924 22 12 22c5.076 0 8.75-6.72 8.75-11.25C20.75 5.925 16.824 2 12 2zm6.244 6.786a.623.623 0 00-.706-.53 5.05 5.05 0 00-4.282 5.707.626.626 0 00.707.53 5.01 5.01 0 003.322-1.967 5.01 5.01 0 00.959-3.74zm-12.488 0a.63.63 0 01.708-.53 5.01 5.01 0 013.321 1.966 5.014 5.014 0 01.959 3.74.626.626 0 01-.707.532 5.015 5.015 0 01-3.322-1.968 5.012 5.012 0 01-.959-3.74z'
        clipRule='evenodd'
      ></Path>
    </Svg>
  );
};

export const HumanIcon = (props: any) => {
  return (
    <Svg width='24' height='24' fill='none' viewBox='0 0 24 24' {...props}>
      <Path
        fill={props.color || "#000"}
        d='M12.937 2c-4.136 0-7.5 3.364-7.5 7.5v1.102L3.63 14.22a.627.627 0 00.559.905h1.25v3.01c0 .367.16.714.44.951.282.238.647.341 1.012.28l2.297-.38v2.389a.624.624 0 00.727.616l7.5-1.25a.624.624 0 00.523-.616v-3.851c0-.87.428-1.568.787-2.002A7.499 7.499 0 0020.437 9.5c0-4.136-3.363-7.5-7.5-7.5z'
      ></Path>
    </Svg>
  );
};

export const AgeIcon = (props: any) => {
  return (
    <Svg width='24' height='24' fill='none' viewBox='0 0 24 24' {...props}>
      <Path
        fill={props.color || "#000"}
        d='M16.565 18.087H14.61V8.304a.652.652 0 00-.652-.652h-1.305v-.547a1.958 1.958 0 001.044-2.82l-1.131-1.96a.653.653 0 00-1.13 0l-1.13 1.96a1.957 1.957 0 001.043 2.82v.547h-1.305a.652.652 0 00-.652.652 1.959 1.959 0 01-1.956 1.957.652.652 0 00-.653.652v2.608c0 .36.292.653.653.653H9.39v3.913H7.435a.652.652 0 00-.653.652v2.609c0 .36.292.652.653.652h9.13c.36 0 .652-.292.652-.652v-2.609a.652.652 0 00-.652-.652zm-5.13-13.15l.565-.98.566.98a.653.653 0 11-1.132 0zm4.478 15.759H8.087V19.39h1.956c.36 0 .653-.292.653-.652v-5.217a.652.652 0 00-.653-.653H8.087V11.5a3.271 3.271 0 002.543-2.543h2.674v9.783c0 .36.292.652.653.652h1.956v1.305z'
      ></Path>
    </Svg>
  );
};

export const WeightIcon = (props: any) => {
  return (
    <Svg width='24' height='24' fill='none' viewBox='0 0 24 24' {...props}>
      <Path
        fill={props.color || "#000"}
        d='M16.675 9.41l.93-1.77a3.87 3.87 0 00-.114-3.781A3.87 3.87 0 0014.197 2H9.803a3.87 3.87 0 00-3.295 1.859 3.87 3.87 0 00-.113 3.781l.93 1.77A7.923 7.923 0 006.06 21.063 2.78 2.78 0 008.14 22h7.718a2.78 2.78 0 002.081-.937A7.923 7.923 0 0016.674 9.41zm-9.05-4.877a2.56 2.56 0 012.178-1.23h4.394c.886 0 1.72.472 2.179 1.23a2.56 2.56 0 01.074 2.5l-.888 1.692a7.832 7.832 0 00-1.3-.516l.806-1.536a1.357 1.357 0 00-.04-1.326 1.357 1.357 0 00-1.155-.652h-3.746c-.47 0-.913.25-1.156.652-.243.402-.258.91-.04 1.326l.808 1.536a7.835 7.835 0 00-1.3.516l-.89-1.691a2.56 2.56 0 01.075-2.5zm6.29 1.533l-.983 1.87a7.972 7.972 0 00-1.863 0l-.983-1.87a.046.046 0 01.04-.067h3.747c.016 0 .032.009.04.022a.047.047 0 01.001.045zM16.963 20.2c-.28.316-.682.497-1.105.497H8.141c-.423 0-.825-.181-1.105-.497a6.616 6.616 0 01-1.662-4.388A6.633 6.633 0 0112 9.185a6.633 6.633 0 016.626 6.626c0 1.619-.59 3.177-1.662 4.388z'
      ></Path>
    </Svg>
  );
};

export const HeightIcon = (props: any) => {
  return (
    <Svg width='24' height='24' fill='none' viewBox='0 0 24 24' {...props}>
      <Path
        fill={props.color || "#000"}
        d='M21.819 20.942L3.058 2.182A.62.62 0 002 2.62v18.76c0 .342.278.62.62.62h18.76a.62.62 0 00.439-1.058zm-6.55-.182v-1.034a.62.62 0 10-1.24 0v1.034h-1.44v-.659a.62.62 0 10-1.24 0v.66h-1.44v-1.035a.62.62 0 10-1.24 0v1.034h-1.44v-.659a.62.62 0 00-1.24 0v.66H3.24v-2.75H3.9a.62.62 0 000-1.24H3.24v-1.44h1.034a.62.62 0 100-1.24H3.24v-1.44H3.9a.62.62 0 000-1.24H3.24v-1.44h1.034a.62.62 0 100-1.24H3.24V4.118L19.883 20.76h-4.615z'
      ></Path>
      <Path
        fill={props.color || "#000"}
        d='M6.586 18.012h5.628a.62.62 0 00.438-1.059l-5.628-5.628a.62.62 0 00-1.058.439v5.628c0 .342.277.62.62.62zm.62-4.751l3.51 3.51h-3.51v-3.51z'
      ></Path>
    </Svg>
  );
};

export const UniverseIcon = (props: any) => {
  return (
    <Svg width='24' height='24' fill='none' viewBox='0 0 24 24' {...props}>
      <Path
        fill={props.color || "#000"}
        d='M19.257 2.483c-.8.39-1.813 1.03-2.946 1.86C13.02 2.482 8.668 2.895 5.778 5.785c-2.897 2.896-3.3 7.246-1.443 10.534-.828 1.131-1.467 2.143-1.855 2.942-.364.748-.778 1.814-.171 2.421.517.518 1.35.31 2.023.032 1.093-.45 2.408-1.351 3.354-2.05 3.25 1.829 7.601 1.468 10.52-1.45 2.896-2.896 3.294-7.243 1.45-10.52.18-.242.351-.48.514-.713.732-1.048 1.251-1.939 1.544-2.648.144-.35.582-1.412-.031-2.025-.608-.607-1.676-.19-2.426.175zm-7.111 1.905c.504.01 1 .069 1.483.174l-1.95 1.951a6.544 6.544 0 00-1.93 4.658A5.38 5.38 0 018.163 15l-1.955 1.955a7.538 7.538 0 01-1.654-3.318l1.57-1.57a11.981 11.981 0 002.25-3.12 10.81 10.81 0 012.028-2.815l1.744-1.744zM8.99 15.828a6.544 6.544 0 001.93-4.657 5.38 5.38 0 011.586-3.83l2.386-2.386a7.681 7.681 0 013.34 2.677c-1.352 1.749-3.092 3.704-4.998 5.61-1.908 1.907-3.862 3.647-5.61 4.999a7.616 7.616 0 01-.589-.458l1.955-1.955zM6.606 6.614a7.554 7.554 0 013.699-2.042l-.732.731a11.981 11.981 0 00-2.248 3.12 10.813 10.813 0 01-2.029 2.815l-.915.915a7.565 7.565 0 012.225-5.54zm.034 12.362c-2.33 1.676-3.223 1.846-3.47 1.852.012-.333.361-1.368 1.858-3.467a8.899 8.899 0 001.616 1.612l-.004.003zm10.738-1.591a7.565 7.565 0 01-5.54 2.225l1.299-1.299a4.987 4.987 0 011.94-1.199 6.168 6.168 0 002.398-1.482l1.944-1.943a7.554 7.554 0 01-2.041 3.698zm2.225-5.54l-2.956 2.956a4.989 4.989 0 01-1.94 1.2c-.9.3-1.729.812-2.399 1.482l-1.954 1.954a7.53 7.53 0 01-1.64-.56c1.686-1.333 3.53-2.988 5.35-4.806 1.817-1.818 3.472-3.663 4.806-5.35.46.966.711 2.025.733 3.124zm-.63-5.201c-.003.002-.005.005-.006.008a8.903 8.903 0 00-1.614-1.617c2.103-1.5 3.14-1.851 3.475-1.865-.007.249-.179 1.144-1.856 3.474z'
      ></Path>
      <Path
        fill={props.color || "#000"}
        d='M14.478 10.342a1.171 1.171 0 10-1.656-1.657 1.171 1.171 0 001.656 1.657z'
      ></Path>
    </Svg>
  );
};

export const UserIcon = (props: any) => {
  return (
    <Svg width='18' height='17' fill='none' viewBox='0 0 18 17' {...props}>
      <Path
        fill={props.color || "#A4A4A4"}
        d='M17.288 15.702c-1.271-2.199-3.232-3.775-5.519-4.523a6.013 6.013 0 10-6.151 0c-2.288.747-4.248 2.324-5.52 4.523a.669.669 0 101.157.668c1.574-2.719 4.354-4.342 7.438-4.342 3.085 0 5.865 1.623 7.439 4.342a.669.669 0 101.156-.668zM4.017 6.015a4.677 4.677 0 119.353 0 4.677 4.677 0 01-9.353 0z'
      ></Path>
    </Svg>
  );
};

export const KeyIcon = (props: any) => {
  return (
    <Svg width='19' height='20' fill='none' viewBox='0 0 19 20' {...props}>
      <Path
        fill={props.color || "#A4A4A4"}
        d='M17.39 2.908l.65-.64a.919.919 0 10-1.3-1.3l-1.28 1.29-2.59 2.59-5.775 5.765a4.575 4.575 0 101.3 1.3l5.115-5.125 1.94 1.949a.915.915 0 101.29-1.3l-1.94-1.94 1.3-1.29.64.64a.916.916 0 101.3-1.29l-.65-.65zM4.58 17.174a2.745 2.745 0 110-5.49 2.745 2.745 0 010 5.49z'
      ></Path>
    </Svg>
  );
};

export const EyeIcon = (props: any) => {
  return (
    <>
      {props.open ? (
        <Svg width='19' height='13' fill='none' viewBox='0 0 19 13' {...props}>
          <Path
            fill='#A4A4A4'
            d='M18.945 6.237c-.027-.064-.698-1.591-2.189-3.121C14.77 1.077 12.261 0 9.5 0S4.23 1.077 2.244 3.116C.753 4.646.079 6.175.054 6.236a.665.665 0 000 .529c.028.064.699 1.59 2.19 3.12C4.23 11.923 6.739 13 9.5 13s5.27-1.077 7.256-3.115c1.491-1.53 2.162-3.056 2.19-3.12a.665.665 0 000-.528zM9.5 11.7c-2.437 0-4.566-.91-6.328-2.702A10.826 10.826 0 011.346 6.5a10.815 10.815 0 011.826-2.498C4.934 2.209 7.063 1.3 9.5 1.3c2.437 0 4.566.91 6.328 2.702.724.737 1.34 1.579 1.83 2.498-.57 1.094-3.057 5.2-8.158 5.2zm0-9.1c-.752 0-1.486.229-2.111.657a3.88 3.88 0 00-1.4 1.75 3.996 3.996 0 00-.216 2.254 3.933 3.933 0 001.04 1.997 3.771 3.771 0 001.946 1.067 3.71 3.71 0 002.195-.222 3.823 3.823 0 001.706-1.436 3.974 3.974 0 00-.474-4.924A3.756 3.756 0 009.5 2.6zm0 6.5c-.501 0-.99-.152-1.407-.438a2.587 2.587 0 01-.933-1.167 2.664 2.664 0 01-.145-1.502c.098-.505.34-.968.694-1.331a2.514 2.514 0 011.297-.712c.491-.1 1-.049 1.463.148.463.197.859.53 1.137.958.279.427.427.93.427 1.444 0 .69-.267 1.35-.742 1.838A2.5 2.5 0 019.5 9.1z'
          ></Path>
        </Svg>
      ) : (
        <Svg width='18' height='15' fill='none' viewBox='0 0 18 15' {...props}>
          <Path
            fill='#A4A4A4'
            d='M3.731.285A.846.846 0 102.48 1.423l1.128 1.245C1.177 4.285.123 6.607.072 6.716a.852.852 0 000 .688c.027.058.644 1.429 2.01 2.793 1.825 1.823 4.126 2.787 6.665 2.787a9.26 9.26 0 003.596-.706l1.417 1.559a.846.846 0 001.252-1.138L3.732.285zM8.747 11.29c-2.087 0-3.912-.757-5.424-2.248A9.216 9.216 0 011.802 7.06c.371-.657 1.325-2.109 2.962-3.124l6.353 6.99a7.712 7.712 0 01-2.37.365zm8.674-3.887c-.026.057-.635 1.41-1.975 2.761a.848.848 0 01-1.225.034.846.846 0 01.026-1.225 9.2 9.2 0 001.445-1.914 9.194 9.194 0 00-1.521-1.983c-1.513-1.492-3.338-2.249-5.424-2.249-.237 0-.473.01-.706.03a.846.846 0 11-.14-1.686c.277-.024.564-.036.846-.036 2.538 0 4.84.964 6.663 2.787 1.365 1.364 1.983 2.736 2.009 2.793a.853.853 0 01.002.688z'
          ></Path>
        </Svg>
      )}
    </>
  );
};

export const GoogleIcon = (props: any) => {
  return (
    <Svg width='20' height='21' fill='none' viewBox='0 0 20 21' {...props}>
      <Path
        fill='#FFC107'
        d='M19.527 8.474h-.78v-.04H10.02v3.878H15.5a5.815 5.815 0 01-11.296-1.94 5.817 5.817 0 015.817-5.816c1.483 0 2.832.56 3.859 1.473l2.742-2.742A9.65 9.65 0 0010.021.678C4.667.678.326 5.018.326 10.373c0 5.354 4.34 9.695 9.695 9.695 5.354 0 9.695-4.341 9.695-9.695 0-.65-.067-1.285-.189-1.899z'
      ></Path>
      <Path
        fill='#4CAF50'
        d='M10.021 20.068a9.65 9.65 0 006.5-2.517l-3-2.54a5.773 5.773 0 01-3.5 1.179 5.814 5.814 0 01-5.47-3.852l-3.16 2.436c1.604 3.14 4.862 5.294 8.63 5.294z'
      ></Path>
      <Path
        fill='#1976D2'
        d='M19.527 8.474h-.78v-.04H10.02v3.878h5.48a5.836 5.836 0 01-1.982 2.7h.001l3 2.539c-.211.193 3.196-2.33 3.196-7.178 0-.65-.067-1.285-.189-1.899z'
      ></Path>
      <Path
        fill='#FF3D00'
        d='M1.444 5.86l3.185 2.336a5.814 5.814 0 015.392-3.64c1.483 0 2.832.56 3.859 1.473l2.742-2.742A9.65 9.65 0 0010.021.678 9.69 9.69 0 001.444 5.86z'
      ></Path>
    </Svg>
  );
};

export const AppleIcon = () => {
  return (
    <Image
      source={require("../assets/icons/apple-icon.png")}
      width={16}
      height={20}
    />
  );
};

export const FacebookIcon = () => {
  return (
    <Image
      source={require("../assets/icons/facebook-icon.png")}
      width={20}
      height={20}
    />
  );
};

export const Line = (props: any) => {
  return (
    <>
      {props.right ? (
        <Svg width='98' height='1' fill='none' viewBox='0 0 98 1'>
          <Path
            fill='url(#paint0_linear_2472_22)'
            fillOpacity='0.75'
            d='M0 0l98 .5L0 1V0z'
          ></Path>
          <Defs>
            <LinearGradient
              id='paint0_linear_2472_22'
              x1='0'
              x2='103.5'
              y1='1'
              y2='0'
              gradientUnits='userSpaceOnUse'
            >
              <Stop stopColor='#D9D9D9'></Stop>
              <Stop offset='1' stopColor='#D9D9D9' stopOpacity='0'></Stop>
            </LinearGradient>
          </Defs>
        </Svg>
      ) : (
        <Svg width='98' height='1' fill='none' viewBox='0 0 98 1'>
          <Path
            fill='url(#paint0_linear_2472_21)'
            fillOpacity='0.75'
            d='M0 .5L98 0v1L0 .5z'
          ></Path>
          <Defs>
            <LinearGradient
              id='paint0_linear_2472_21'
              x1='98'
              x2='5.5'
              y1='1'
              y2='1'
              gradientUnits='userSpaceOnUse'
            >
              <Stop stopColor='#D9D9D9'></Stop>
              <Stop offset='1' stopColor='#D9D9D9' stopOpacity='0'></Stop>
            </LinearGradient>
          </Defs>
        </Svg>
      )}
    </>
  );
};
