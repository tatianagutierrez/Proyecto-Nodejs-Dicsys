import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { GlobalText } from '../../../data/text';
import { Router } from '@angular/router';
import { ProductosService } from '../../../data/services/productos/productos.service';
import { FooterComponent } from '../../components/footer/footer.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, NgFor],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  public category
  productos: any;
  imagenDefault = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQunrIhOSUUk2Qko66dLjww5zyenkkguPB_XA&s'
  

  constructor(
    public globalText: GlobalText, 
    public router: Router,
    public productosService: ProductosService
  ) {

    const navigability = this.router.getCurrentNavigation()

    if (navigability && navigability.extras && navigability.extras.state) {
      const data = navigability.extras.state
      this.category = data['category']; 
      
    }   

    this.productosService.getProductosByCategoria(this.category.id).subscribe(result => {
      this.productos = result
    })

  }

  eliminarProducto(id: number) {
    this.productosService.eliminarProducto(id).subscribe(result => {
      console.log(result)
      location.reload()
    })
  }

}
