import { SVGProps } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg width={40} height={40} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M20 40c11.046 0 20-8.954 20-20S31.046 0 20 0 0 8.954 0 20s8.954 20 20 20Z"
      fill="#F7D7E6"
    />
    <path
      d="m33.07 16.441-12.788-4.514a.884.884 0 0 0-.413-.041h-.004a.662.662 0 0 0-.147.04L6.93 16.442a.859.859 0 0 0-.576.81c0 .363.232.69.576.808l4.694 1.66v6.393c0 .756.503 1.3.924 1.623.465.355 1.074.653 1.863.91 1.511.49 3.497.756 5.593.756s4.082-.27 5.594-.755c.788-.254 1.397-.552 1.863-.912.42-.322.92-.866.92-1.622v-6.398l3.558-1.254v3.685a.85.85 0 0 0 .854.866c.229 0 .445-.09.608-.253a.855.855 0 0 0 .246-.609v-4.895a.855.855 0 0 0-.576-.813Zm-2.855.801L20 20.858 9.773 17.25 20 13.63l10.215 3.612Zm-16.883 3.073 6.39 2.255c.18.061.38.061.56 0l6.386-2.255V26.1s-.016.094-.253.278c-.274.212-.772.441-1.357.63-1.332.428-3.174.677-5.058.677s-3.726-.245-5.058-.678c-.584-.188-1.083-.42-1.357-.629-.233-.18-.253-.274-.253-.274v-5.79Z"
      fill="#80224D"
    />
  </svg>
)

export default SvgComponent
