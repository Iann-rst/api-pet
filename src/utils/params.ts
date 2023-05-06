interface QueryFilters {
  age?: 'cub' | 'adolescent' | 'elderly'
  type?: 'cat' | 'dog'
  size?: 'small' | 'medium' | 'big'
  lvl_independence?: 'medium' | 'low' | 'high'
}

export interface ParamsPet {
  query?: QueryFilters
}
