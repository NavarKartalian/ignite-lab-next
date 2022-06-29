import Image from "next/image";

export function Footer() {
  return (
    <footer className="flex items-center w-full h-44 bg-gray-900 px-6 
      text-gray-300 border-t border-gray-500 lg:flex-row flex-col lg:justify-between lg:h-20">
      <div className="flex flex-col items-center gap-6 lg:flex-row mt-6 mb-6 lg:mt-0 lg:mb-0">
        <Image 
          src="/assets/footer-logo.svg" 
          alt="Rocket footer logo" 
          width={162} 
          height={31} 
          quality={80} 
        />
        <p>Rocketseat - Todos os direitos reservados</p>
      </div>

      <p>Políticas de privacidade</p>
    </footer>
  );
}