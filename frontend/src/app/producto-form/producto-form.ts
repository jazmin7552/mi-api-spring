import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductoService, Producto } from '../producto.service';

@Component({
  selector: 'app-producto-form',
  imports: [FormsModule],
  templateUrl: './producto-form.html',
  styleUrl: './producto-form.css'
})
export class ProductoForm implements OnInit {
  producto: Producto = { nombre: '', precio: 0, descripcion: '', categoria: '' };
  isEditMode = false;

  constructor(
    private productoService: ProductoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.productoService.getProducto(+id).subscribe({
        next: (data) => this.producto = data,
        error: (error) => console.error('Error loading producto:', error)
      });
    }
  }

  onSubmit(): void {
    if (this.isEditMode && this.producto.id) {
      this.productoService.updateProducto(this.producto.id, this.producto).subscribe({
        next: () => this.router.navigate(['/']),
        error: (error) => console.error('Error updating producto:', error)
      });
    } else {
      this.productoService.createProducto(this.producto).subscribe({
        next: () => this.router.navigate(['/']),
        error: (error) => console.error('Error creating producto:', error)
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
