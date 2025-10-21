import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { NgIf, NgFor } from '@angular/common';
import { User } from '../../model/user';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor],
  template: `
    <section class="container">
      <h1>Detalle de usuario</h1>

      <ng-container *ngIf="loading; else content">
        <p>Cargando...</p>
      </ng-container>

      <ng-template #content>
        <ng-container *ngIf="error; else ok">
          <p style="color:crimson">Error: {{ error }}</p>
        </ng-container>

        <ng-template #ok>
          <ng-container *ngIf="user; else empty">
            <div class="card">
              <h2>{{ user.fullName }}</h2>
              <p><strong>Email:</strong> {{ user.email }}</p>
              <p><strong>Teléfono:</strong> {{ user.phoneNumber }}</p>
              <p><strong>Status:</strong> {{ user.status }}</p>

              <h3>Roles</h3>
              <ul>
                <li *ngFor="let r of user.roles">
                  {{ r.name }} — {{ r.description }} (activo: {{ r.active ? 'sí' : 'no' }})
                </li>
              </ul>

              <h3>Grupos</h3>
              <p *ngIf="!user.groups || user.groups.length === 0">Sin grupos</p>
              <ul *ngIf="user.groups && user.groups.length > 0">
                <li *ngFor="let g of user.groups">{{ g | json }}</li>
              </ul>
            </div>
          </ng-container>
          <ng-template #empty>
            <p>No hay datos.</p>
          </ng-template>
        </ng-template>
      </ng-template>
    </section>
  `,
})
export class UserDetailsComponent implements OnInit {
  private userService = inject(UserService);

  user: User | null = null;
  loading = false;
  error: string | null = null;

  ngOnInit(): void {
    this.loading = true;
    this.userService.getUserById(2).subscribe({
      next: (u) => {
        this.user = u;
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.message ?? 'Error desconocido';
        this.loading = false;
      },
    });
  }
}
