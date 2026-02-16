export interface PropertyProps {
  id: string;
  name: string;
  description: string;
  maxGuest: number;
  price: number;
}

export function validateProperty(props: PropertyProps): void{
  const {id, name, description, maxGuest, price} = props;

  if(!id){
    throw new Error("O ID e obrigatorio!");
  }

  if(!name){
    throw new Error("O nome e obrigatorio!");
  }

  if(!description){
    throw new Error("A descricao e obrigatoria!");
  }

  if(maxGuest <= 0){
    throw new Error("O numero maximo de hospedes deve ser maior que zero!");
  }

  if(price <= 0){
    throw new Error("O preco deve ser maior que 0!");
  }
}